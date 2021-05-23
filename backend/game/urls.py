from rest_framework import routers
from .views import QuizAnswerViewSet, QuizQuestionViewSet


router = routers.DefaultRouter()
router.register('api/game/quiz/question',
                QuizQuestionViewSet, 'quiz_question')
router.register('api/game/quiz/answer', QuizAnswerViewSet, 'quiz_answer')

urlpatterns = router.urls
