import React, { useEffect, useState } from 'react';
import ScoreCard from '../../components/ScoreCard';
import ScoreBreakdown from '../../components/ScoreBreakdown';
import RecommendedResources from '../../components/RecommendedResources';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';
import { Link } from 'react-router-dom'; // Using react-router-dom for navigation

const ResultsPage: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const score = parseInt(searchParams.get('score') || '0', 10);
  const totalQuestions = parseInt(searchParams.get('total') || '10', 10);
  const subject = searchParams.get('subject') || 'Unknown';
  const [showBreakdown, setShowBreakdown] = useState<boolean>(false);

  useEffect(() => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [score, totalQuestions]);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">Quiz Results</h1>
      <ScoreCard score={score} totalQuestions={totalQuestions} subject={subject} />
      <div className="flex justify-center space-x-4">
        <Button onClick={() => setShowBreakdown(!showBreakdown)}>
          {showBreakdown ? 'Hide' : 'Show'} Score Breakdown
        </Button>
        <Link to="/" className="outline-button">
          Back to Subjects
        </Link>
      </div>
      {showBreakdown && <ScoreBreakdown score={score} totalQuestions={totalQuestions} />}
      <RecommendedResources score={score} totalQuestions={totalQuestions} subject={subject} />
    </div>
  );
};

export default ResultsPage;
