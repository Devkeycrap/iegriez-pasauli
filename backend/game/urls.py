from rest_framework import routers
from .views import QuizViewSet


router = routers.DefaultRouter()
router.register('api/game', QuizViewSet, 'quiz')

urlpatterns = router.urls
