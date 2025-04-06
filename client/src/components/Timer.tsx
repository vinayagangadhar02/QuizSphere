interface TimerProps {
    timeLeft: number
  }
  
  export default function Timer({ timeLeft }: TimerProps) {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
  
    return (
      <div className="ml-40 text-2xl font-bold">
        Time Left: {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
    )
  }
  
  