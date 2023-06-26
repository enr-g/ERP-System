from django.urls import path
from user.views import ListUserView, SearchUserView, RetrieveUpdateDestroyUserView, MyUserRetrieveUpdateDeleteView

urlpatterns = [
    # backend/api/users/
    path('', ListUserView.as_view()),
    path('search/', SearchUserView.as_view()),
    path('<int:user_id>/', RetrieveUpdateDestroyUserView.as_view()),
    path("me/", MyUserRetrieveUpdateDeleteView.as_view()),
]
