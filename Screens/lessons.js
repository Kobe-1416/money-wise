import React, { useState } from 'react';
import { ScrollView, Pressable, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const learningData = {
  basics: {
    name: 'Basics',
    icon: '🎓',
    lessons: [
      {
        title: 'Understanding Money and Finance',
        content: `Money is a medium of exchange that facilitates trade and commerce. Understanding its basic principles is crucial for financial success.\n\nKey concepts:\n• Money serves as a store of value, unit of account, and medium of exchange\n• Inflation affects purchasing power over time\n• Interest can work for or against you\n• Time value of money - money today is worth more than money tomorrow\n• Financial literacy is the foundation of wealth building\n\nBuilding a strong foundation in these basics will guide all your future financial decisions.`
      },
      {
        title: 'Setting Financial Goals',
        content: `Clear financial goals provide direction and motivation for your money management journey.\n\nSMART Goal Framework:\n• Specific - Define exactly what you want\n• Measurable - Quantify your target\n• Achievable - Set realistic expectations\n• Relevant - Align with your values\n• Time-bound - Set deadlines\n\nTypes of financial goals:\n• Short-term (1 year): Emergency fund, vacation\n• Medium-term (1-5 years): Car, house deposit\n• Long-term (5+ years): Retirement, children's education\n\nWrite down your goals and review them regularly to stay on track.`
      }
    ],
    quiz: {
      question: 'What does SMART stand for in goal setting?',
      options: [
        'Simple, Meaningful, Achievable, Relevant, Timely',
        'Specific, Measurable, Achievable, Relevant, Time-bound',
        'Strategic, Meaningful, Actionable, Realistic, Tracked',
        'Specific, Motivated, Actionable, Relevant, Targeted'
      ],
      correct: 1
    }
  },
  budgeting: {
    name: 'Budgeting',
    icon: '💰',
    lessons: [
      {
        title: 'The 50/30/20 Rule',
        content: `The 50/30/20 rule is a simple budgeting framework that divides your after-tax income into three categories:\n\n50% - Needs (Essential expenses)\n• Rent/mortgage\n• Utilities\n• Groceries\n• Transportation\n• Insurance\n• Minimum debt payments\n\n30% - Wants (Discretionary spending)\n• Entertainment\n• Dining out\n• Hobbies\n• Non-essential shopping\n• Subscriptions\n\n20% - Savings and debt repayment\n• Emergency fund\n• Retirement savings\n• Extra debt payments\n• Investment contributions\n\nThis rule provides a balanced approach to managing your money while ensuring you save for the future.`
      },
      {
        title: 'Creating Your Personal Budget',
        content: `Building a personal budget requires understanding your income and expenses.\n\nStep 1: Calculate Your Income\n• Include all sources: salary, freelance, investments\n• Use net (after-tax) income for budgeting\n\nStep 2: Track Your Expenses\n• Fixed expenses (rent, insurance)\n• Variable expenses (groceries, entertainment)\n• Use apps or spreadsheets to monitor spending\n\nStep 3: Apply the 50/30/20 Rule\n• Allocate income according to the framework\n• Adjust percentages based on your situation\n\nStep 4: Monitor and Adjust\n• Review monthly\n• Make changes as needed\n• Stay flexible but disciplined\n\nConsistency is key to successful budgeting.`
      }
    ],
    quiz: {
      question: 'In the 50/30/20 rule, what percentage should go to wants/discretionary spending?',
      options: ['20%', '30%', '40%', '50%'],
      correct: 1
    }
  },
  saving: {
    name: 'Saving & Emergency Fund',
    icon: '🏦',
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
  investing: {
    name: 'Investing',
    icon: '📈',
    lessons: [
      {
        title: 'Investment Basics',
        content: `Investing is putting your money to work to generate returns over time. It's essential for building long-term wealth.\n\nKey concepts:\n• Risk vs. Return - Higher potential returns usually mean higher risk\n• Diversification - Don't put all eggs in one basket\n• Time horizon - Longer investment periods can weather market volatility\n• Compound interest - Earning returns on your returns\n\nCommon investment types:\n• Stocks - Ownership shares in companies\n• Bonds - Loans to companies or governments\n• Mutual funds - Pooled investments\n• ETFs - Exchange-traded funds\n• Property - Real estate investments\n\nStart early, invest regularly, and stay patient for the best results.`
      },
      {
        title: 'Getting Started with Investing',
        content: `Beginning your investment journey doesn't require large amounts of money or extensive knowledge.\n\nBefore you invest:\n• Build an emergency fund first\n• Pay off high-interest debt\n• Define your investment goals\n• Determine your risk tolerance\n\nSimple starting strategies:\n• Start with low-cost index funds or ETFs\n• Use rand-cost averaging (invest regularly)\n• Begin with small amounts you can afford\n• Reinvest dividends automatically\n\nPlatforms for beginners:\n• Unit trusts through banks\n• Online investment platforms\n• Tax-free savings accounts (TFSA)\n• Retirement annuities (RA)\n\nConsistency beats timing - regular investing often outperforms trying to time the market.`
      }
    ],
    quiz: {
      question: 'What is compound interest?',
      options: [
        'Interest paid only on the original investment',
        'Earning returns on your returns over time',
        'A type of savings account',
        'Interest that decreases over time'
      ],
      correct: 1
    }
  },
  credit: {
    name: 'Credit & Loans',
    icon: '💳',
    lessons: [
      {
        title: 'When to Take Credit Wisely',
        content: `Credit can be a powerful financial tool when used responsibly, but timing and purpose matter greatly.\n\nGood reasons to use credit:\n• Building credit history\n• Purchasing appreciating assets (property)\n• Education investments\n• Business opportunities\n• Emergency situations (last resort)\n\nAvoid credit for:\n• Vacations and luxury items\n• Daily living expenses\n• Impulse purchases\n• Items that depreciate quickly\n\nBefore taking credit, ask yourself:\n• Can I afford the monthly payments?\n• Will this improve my financial position?\n• Do I have a plan to pay it off?\n• Are there alternatives?\n\nResponsible credit use can enhance your financial flexibility and build wealth over time.`
      },
      {
        title: 'Credit-to-Income Ratio Guidelines',
        content: `Your debt-to-income ratio is crucial for financial health and determines how much credit you can safely handle.\n\nThe 36% Rule:\n• Total monthly debt payments shouldn't exceed 36% of gross monthly income\n• This includes all debt: credit cards, loans, mortgages\n• Lenders use this ratio to assess creditworthiness\n\nBreakdown recommendations:\n• Housing costs: Maximum 28% of gross income\n• Other debt: Maximum 8% of gross income\n• Total debt service: Maximum 36% of gross income\n\nCalculating your ratio:\n• Add all monthly debt payments\n• Divide by gross monthly income\n• Multiply by 100 for percentage\n\nStaying within these limits ensures you can manage payments comfortably while maintaining financial flexibility.`
      }
    ],
    quiz: {
      question: 'According to the 36% rule, what is the maximum percentage of gross monthly income that should go to total debt payments?',
      options: ['25%', '30%', '36%', '40%'],
      correct: 2
    }
  }
};

export default function Lessons() {
  const [currentModule, setCurrentModule] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState(null);
  const [completedItems, setCompletedItems] = useState({});
  const [view, setView] = useState('modules'); // 'modules', 'lessons', 'lesson', 'quiz'
  const [showingQuizResult, setShowingQuizResult] = useState(false);

  const learningModules = Object.keys(learningData).map(key => ({
    id: key,
    ...learningData[key]
  }));

  const markItemComplete = (moduleId, type, index = null) => {
    const key = index !== null ? `${moduleId}_${type}_${index}` : `${moduleId}_${type}`;
    setCompletedItems({ ...completedItems, [key]: true });
  };

  const isCompleted = (moduleId, type, index = null) => {
    const key = index !== null ? `${moduleId}_${type}_${index}` : `${moduleId}_${type}`;
    return completedItems[key];
  };

  const handlePress = (moduleId) => {
    setCurrentModule(moduleId);
    setView('lessons');
  };

  const renderModules = () => (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Learning Modules</Text>
      <View style={styles.modulesGrid}>
        {learningModules.map((module) => (
          <Pressable
            key={module.id}
            style={styles.moduleCard}
            onPress={() => handlePress(module.id)}
          >
            <Text style={styles.moduleIcon}>{module.icon}</Text>
            <Text style={styles.moduleName}>{module.name}</Text>
            <Text style={styles.moduleCount}>{module.count}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );

  const renderLessons = () => {
    const moduleData = learningData[currentModule];
    return (
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: 30 }]}>
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {view === 'modules' && renderModules()}
      {view === 'lessons' && renderLessons()}
      {view === 'lesson' && renderLesson()}
      {view === 'quiz' && renderQuiz()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4a6cf7' },
  scrollContent: { padding: 20 },
  title: { fontSize: 20, color: 'white', fontWeight: '600', marginBottom: 20 },
  modulesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  moduleCard: {
    width: (width - 60) / 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  moduleIcon: { fontSize: 24, marginBottom: 10 },
  moduleName: { color: 'white', fontSize: 14, fontWeight: '500', marginBottom: 2, textAlign: 'center' },
  moduleCount: { color: 'rgba(255,255,255,0.7)', fontSize: 12, textAlign: 'center' },
  
  // New styles for enhanced functionality
  backButton: { marginBottom: 15 },
  backButtonText: { color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: '500' },
  lessonCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    marginBottom: 15
  },
  lessonHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  lessonTitle: { fontSize: 14, fontWeight: '500', color: 'white', flex: 1 },
  completedText: { color: '#4caf50', fontSize: 14, fontWeight: '600' },
  quizCard: { backgroundColor: 'rgba(255,193,7,0.1)', borderColor: 'rgba(255,193,7,0.3)' },
  lessonNumber: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 5 },
  lessonTitleLarge: { fontSize: 22, fontWeight: '600', color: 'white', marginBottom: 20 },
  lessonContent: { fontSize: 16, color: 'white', marginBottom: 20 },
  lessonControls: { marginTop: 20 },
  navigationButtons: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  navButton: { padding: 10, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8 },
  navButtonText: { color: 'white' },
  completeButton: { padding: 12, backgroundColor: '#f39c12', borderRadius: 8, alignItems: 'center' },
  completedButton: { backgroundColor: '#4caf50' },
  completeButtonText: { color: 'white', fontWeight: '600' },
  quizQuestion: { fontSize: 16, color: 'white', marginBottom: 20 },
  quizOption: { padding: 12, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: 10 },
  selectedOption: { borderWidth: 2, borderColor: '#ffd700' },
  correctOption: { backgroundColor: '#4caf50' },
  incorrectOption: { backgroundColor: '#e74c3c' },
  quizOptionText: { color: 'white' },
  submitButton: { padding: 15, backgroundColor: '#2196f3', borderRadius: 8, alignItems: 'center', marginTop: 15 },
  disabledButton: { backgroundColor: 'rgba(33,150,243,0.5)' },
  submitButtonText: { color: 'white', fontWeight: '600' },
  quizResult: { marginTop: 20, alignItems: 'center' },
  resultText: { fontSize: 16, fontWeight: '600' },
  correctText: { color: '#4caf50' },
  incorrectText: { color: '#e74c3c' }
});