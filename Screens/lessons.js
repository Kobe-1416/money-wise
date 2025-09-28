import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';

const { width } = Dimensions.get('window');

const learningData = {
  saving: {
    name: 'Saving',
    lessons: [
      {
        title: 'Building Your Emergency Fund',
        content: `An emergency fund is your financial safety net for unexpected expenses like medical bills, car repairs, or job loss.\n\nKey principles:\n• Start with a goal of 3-6 months of living expenses\n• Keep it in a separate, easily accessible savings account\n• Begin small - even R500 can help with minor emergencies\n• Automate transfers to build it consistently\n• Only use for true emergencies, not planned purchases\n\nThe peace of mind from having an emergency fund is invaluable. It prevents you from going into debt when life throws curveballs your way.`
      },
      {
        title: 'Smart Saving Strategies',
        content: `Effective saving requires strategy and discipline. Here are proven methods to boost your savings:\n\nThe Pay Yourself First Method:\n• Save money before paying any bills\n• Treat savings like a non-negotiable expense\n• Automate transfers on payday\n\nThe 24-Hour Rule:\n• Wait 24 hours before non-essential purchases\n• Often the urge to buy will pass\n• Helps distinguish wants from needs\n\nHigh-Yield Savings Accounts:\n• Earn more interest than traditional accounts\n• Look for accounts with no monthly fees\n• Online banks often offer better rates\n\nTrack your progress visually - seeing your savings grow motivates continued success.`
      }
    ],
    quiz: {
      question: 'What is the recommended emergency fund goal?',
      options: [
        '1-2 months of living expenses',
        '3-6 months of living expenses',
        '12 months of living expenses',
        'R1000 fixed amount'
      ],
      correct: 1
    }
  },
  budgeting: {
    name: 'Budgeting',
    lessons: [
      {
        title: 'The 50/30/20 Rule',
        content: `The 50/30/20 rule is a simple budgeting framework that divides your after-tax income into three categories:\n\n50% - Needs (Essential expenses)\n30% - Wants (Discretionary spending)\n20% - Savings and debt repayment`
      },
      {
        title: 'Creating Your Personal Budget',
        content: `Step 1: Calculate Your Income\nStep 2: Track Your Expenses\nStep 3: Apply the 50/30/20 Rule\nStep 4: Monitor and Adjust`
      }
    ],
    quiz: {
      question: 'In the 50/30/20 rule, what percentage should go to wants/discretionary spending?',
      options: ['20%', '30%', '40%', '50%'],
      correct: 1
    }
  },
  cybersecurity: {
    name: 'Cyber Security',
    lessons: [
      {
        title: 'PIN and OTP Security',
        content: `Protecting your financial accounts starts with strong PIN and OTP practices.`
      },
      {
        title: 'Hiding Banking Apps & Digital Security',
        content: `Protecting your financial information on mobile devices is crucial in today's digital world.`
      }
    ],
    quiz: {
      question: 'What should you do if you receive an unexpected OTP?',
      options: ['Ignore it completely', 'Use it on any banking website', 'Contact your bank immediately', 'Share it with customer service'],
      correct: 2
    }
  },
  credit: {
    name: 'Credit',
    lessons: [
      {
        title: 'When to Take Credit Wisely',
        content: `Credit can be a powerful financial tool when used responsibly, but timing and purpose matter greatly.`
      },
      {
        title: 'Credit-to-Income Ratio Guidelines',
        content: `Your debt-to-income ratio is crucial for financial health and determines how much credit you can safely handle.`
      }
    ],
    quiz: {
      question: 'According to the 36% rule, what is the maximum percentage of gross monthly income that should go to total debt payments?',
      options: ['25%', '30%', '36%', '40%'],
      correct: 2
    }
  }
};

export default function App() {
  const [currentModule, setCurrentModule] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState(null);
  const [completedItems, setCompletedItems] = useState({});
  const [view, setView] = useState('modules'); // 'modules', 'lessons', 'lesson', 'quiz'
  const [showingQuizResult, setShowingQuizResult] = useState(false);

  const markItemComplete = (moduleId, type, index = null) => {
    const key = index !== null ? `${moduleId}_${type}_${index}` : `${moduleId}_${type}`;
    setCompletedItems({ ...completedItems, [key]: true });
  };

  const isCompleted = (moduleId, type, index = null) => {
    const key = index !== null ? `${moduleId}_${type}_${index}` : `${moduleId}_${type}`;
    return completedItems[key];
  };

  const renderModules = () => (
    <ScrollView contentContainerStyle={styles.modulesGrid}>
      {Object.keys(learningData).map((moduleId) => (
        <TouchableOpacity
          key={moduleId}
          style={styles.moduleCard}
          onPress={() => {
            setCurrentModule(moduleId);
            setView('lessons');
          }}
        >
          <Text style={styles.moduleIcon}>
            {moduleId === 'saving' ? '🏦' : moduleId === 'budgeting' ? '💰' : moduleId === 'cybersecurity' ? '🔒' : '💳'}
          </Text>
          <Text style={styles.moduleName}>{learningData[moduleId].name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderLessons = () => {
    const moduleData = learningData[currentModule];
    return (
      <ScrollView>
        <TouchableOpacity style={styles.backButton} onPress={() => setView('modules')}>
          <Text style={styles.backButtonText}>← Back to Modules</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{moduleData.name}</Text>
        {moduleData.lessons.map((lesson, index) => (
          <TouchableOpacity
            key={index}
            style={styles.lessonCard}
            onPress={() => {
              setCurrentLessonIndex(index);
              setView('lesson');
            }}
          >
            <View style={styles.lessonHeader}>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              {isCompleted(currentModule, 'lesson', index) && <Text style={styles.completedText}>✓ Done</Text>}
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.lessonCard, styles.quizCard]}
          onPress={() => {
            setView('quiz');
            setSelectedQuizAnswer(null);
            setShowingQuizResult(false);
          }}
        >
          <View style={styles.lessonHeader}>
            <Text style={styles.lessonTitle}>📝 Quiz</Text>
            {isCompleted(currentModule, 'quiz') && <Text style={styles.completedText}>✓ Done</Text>}
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const renderLesson = () => {
    const lesson = learningData[currentModule].lessons[currentLessonIndex];
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <TouchableOpacity style={styles.backButton} onPress={() => setView('lessons')}>
          <Text style={styles.backButtonText}>← Back to Lessons</Text>
        </TouchableOpacity>
        <Text style={styles.lessonNumber}>Lesson {currentLessonIndex + 1}</Text>
        <Text style={styles.lessonTitleLarge}>{lesson.title}</Text>
        <Text style={styles.lessonContent}>{lesson.content}</Text>

        <View style={styles.lessonControls}>
          <View style={styles.navigationButtons}>
            {currentLessonIndex > 0 && (
              <TouchableOpacity style={styles.navButton} onPress={() => setCurrentLessonIndex(currentLessonIndex - 1)}>
                <Text style={styles.navButtonText}>← Previous</Text>
              </TouchableOpacity>
            )}
            {currentLessonIndex < learningData[currentModule].lessons.length - 1 && (
              <TouchableOpacity style={styles.navButton} onPress={() => setCurrentLessonIndex(currentLessonIndex + 1)}>
                <Text style={styles.navButtonText}>Next →</Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={[styles.completeButton, isCompleted(currentModule, 'lesson', currentLessonIndex) && styles.completedButton]}
            onPress={() => markItemComplete(currentModule, 'lesson', currentLessonIndex)}
          >
            <Text style={styles.completeButtonText}>
              {isCompleted(currentModule, 'lesson', currentLessonIndex) ? '✓ Completed' : 'Mark as Done'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  const renderQuiz = () => {
    const quiz = learningData[currentModule].quiz;
    return (
      <ScrollView>
        <TouchableOpacity style={styles.backButton} onPress={() => setView('lessons')}>
          <Text style={styles.backButtonText}>← Back to Lessons</Text>
        </TouchableOpacity>
        <Text style={styles.lessonTitleLarge}>📝 Quiz Time!</Text>
        <Text style={styles.quizQuestion}>{quiz.question}</Text>
        {quiz.options.map((option, index) => {
          let optionStyle = [styles.quizOption];
          if (selectedQuizAnswer === index) optionStyle.push(styles.selectedOption);
          if (showingQuizResult) {
            if (index === quiz.correct) optionStyle.push(styles.correctOption);
            else if (selectedQuizAnswer === index && selectedQuizAnswer !== quiz.correct) optionStyle.push(styles.incorrectOption);
          }
          return (
            <TouchableOpacity
              key={index}
              style={optionStyle}
              onPress={() => !showingQuizResult && setSelectedQuizAnswer(index)}
            >
              <Text style={styles.quizOptionText}>{option}</Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={[styles.submitButton, (selectedQuizAnswer === null || showingQuizResult) && styles.disabledButton]}
          disabled={selectedQuizAnswer === null || showingQuizResult}
          onPress={() => {
            setShowingQuizResult(true);
            if (selectedQuizAnswer === quiz.correct) markItemComplete(currentModule, 'quiz');
          }}
        >
          <Text style={styles.submitButtonText}>Submit Answer</Text>
        </TouchableOpacity>
        {showingQuizResult && (
          <View style={styles.quizResult}>
            <Text style={[styles.resultText, selectedQuizAnswer === quiz.correct ? styles.correctText : styles.incorrectText]}>
              {selectedQuizAnswer === quiz.correct ? '✓ Correct! Well done!' : '✗ Incorrect. Try again!'}
            </Text>
            {selectedQuizAnswer === quiz.correct && <Text style={styles.completedText}>Quiz completed! ✓</Text>}
          </View>
        )}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {view === 'modules' && renderModules()}
      {view === 'lessons' && renderLessons()}
      {view === 'lesson' && renderLesson()}
      {view === 'quiz' && renderQuiz()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4a6cf7',
    paddingTop: Platform.OS === 'ios' ? 60 : 50, // extra top padding for iOS
    paddingHorizontal: 20
  },
  modulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  moduleCard: {
    width: width > 600 ? '48%' : '48%', // always 2 per row for grid
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20
  },
  moduleIcon: {
    fontSize: 28,
    marginBottom: 10
  },
  moduleName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white'
  },
  backButton: {
    marginBottom: 15
  },
  backButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    fontWeight: '500'
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 20
  },
  lessonCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    marginBottom: 15
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  lessonTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    flex: 1
  },
  completedText: {
    color: '#4caf50',
    fontSize: 14,
    fontWeight: '600'
  },
  quizCard: {
    backgroundColor: 'rgba(255,193,7,0.1)',
    borderColor: 'rgba(255,193,7,0.3)'
  },
  lessonNumber: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 5
  },
  lessonTitleLarge: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
    marginBottom: 20
  },
  lessonContent: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20
  },
  lessonControls: {
    marginTop: 20
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  navButton: {
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8
  },
  navButtonText: {
    color: 'white'
  },
  completeButton: {
    padding: 12,
    backgroundColor: '#f39c12',
    borderRadius: 8,
    alignItems: 'center'
  },
  completedButton: {
    backgroundColor: '#4caf50'
  },
  completeButtonText: {
    color: 'white',
    fontWeight: '600'
  },
  quizQuestion: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20
  },
  quizOption: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: '#ffd700'
  },
  correctOption: {
    backgroundColor: '#4caf50'
  },
  incorrectOption: {
    backgroundColor: '#e74c3c'
  },
  quizOptionText: {
    color: 'white'
  },
  submitButton: {
    padding: 15,
    backgroundColor: '#2196f3',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15
  },
  disabledButton: {
    backgroundColor: 'rgba(33,150,243,0.5)'
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600'
  },
  quizResult: {
    marginTop: 20,
    alignItems: 'center'
  },
  resultText: {
    fontSize: 16,
    fontWeight: '600'
  },
  correctText: {
    color: '#4caf50'
  },
  incorrectText: {
    color: '#e74c3c'
  }
});
