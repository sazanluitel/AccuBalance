from rest_framework import serializers
from account.models import User
from rest_framework.validators import UniqueValidator

# fro sending password reset link
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator


class UserRegistrationSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    email = serializers.EmailField(
        required=True,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(), message="User with this email is already exists"
            )
        ],
    )
    password = serializers.CharField(max_length=100, required=True, write_only=True)

    class Meta:
        model = User
        fields = ("id", "name", "email", "password")

    def create(self, validated_data):
        user = User(email=validated_data["email"], name=validated_data["name"])
        user.set_password(validated_data["password"])
        user.save()
        return user


class UserLoginSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(max_length=100)
    password = serializers.CharField(max_length=100, required=True)

    class Meta:
        model = User
        fields = ["email", "password"]


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "email"]


class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(max_length=255)
    new_password = serializers.CharField(max_length=255)
    confirm_new_password = serializers.CharField(max_length=255)

    def validate_old_password(self, value):
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is incorrect.")
        return value

    def validate(self, data):
        new_password = data.get("new_password")
        confirm_new_password = data.get("confirm_new_password")

        if new_password != confirm_new_password:
            raise serializers.ValidationError("New passwords do not match.")

        return data


class PasswordResetSerialiazer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        model = User
        fields = ["email"]

    def validate(self, data):
        email = data.get("email")

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            link = f"https://localhost:3000/api/user/reset/{uid}/{token}"
            print(link)
            return link
        else:
            raise serializers.ValidationError("Email not found")


class ResetPasswordUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=255)
    confirm_password = serializers.CharField(max_length=255)

    class Meta:
        model = User
        fields = ["password", "confirm_password"]

    def validate(self, data):
        password = data.get("password")
        confirm_password = data.get("confirm_password")
        uid = self.context.get("uid")
        token = self.context.get("token")
        if password != confirm_password:
            raise serializers.ValidationError("New passwords do not match.")
        id = smart_str(urlsafe_base64_decode(uid))
        user = User.objects.get(id=id)
        if not PasswordResetTokenGenerator().check_token(user, token):
            raise ValidationError("Token is not valid or expired")
        user.set_password(password)
        user.save()
        return data
