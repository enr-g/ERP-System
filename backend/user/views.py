from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from project.global_permissions import IsSameUser, IsStaff
from user.serializers import UserSerializer, UserUpdateSerializer
User = get_user_model()


class ListUserView(ListAPIView):
    """
    get:
    List all users

    # subtitle
    List all users of the merchant (currently, all users are returned)
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer


class SearchUserView(ListAPIView):
    """
    get:
    Search for a specific user

    # subtitle
    Search for a specific user of the merchant
    """

    serializer_class = UserSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = User.objects.filter(merchant__id=merchant.id)
        search_value = self.request.query_params.get('search_string')
        if search_value is not None:
            queryset_filtered = queryset.filter(
                Q(first_name__icontains=search_value) |
                Q(last_name__icontains=search_value) |
                Q(email__icontains=search_value)
            )
        return queryset_filtered


class RetrieveUpdateDestroyUserView(RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve a specific user

    patch:
    Update a specific user

    # subtitle
    Retrieve and update a specific user (accessible only for staff members)
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsStaff]
    lookup_url_kwarg = 'user_id'


class MyUserRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve my user

    patch:
    Update my user

    # subtitle
    Retrieve and update my user
    """

    permission_classes = [IsSameUser]

    def get_object(self):
        return self.request.user

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return UserSerializer
        elif self.request.method == 'PATCH':
            return UserUpdateSerializer
        return UserSerializer
