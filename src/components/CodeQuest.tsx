import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, ArrowRight, CheckCircle2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Confetti from "react-confetti";

// Game State Definitions
type Position = { x: number; y: number };
type Level = {
  id: number;
  title: string;
  description: string;
  gridSize: number;
  start: Position;
  goal: Position;
  obstacles: Position[];
  defaultCode: string;
  hint: string;
};

const levels: Level[] = [
  {
    id: 1,
    title: "Sequence: The First Step",
    description: "Move the runner to the goal flag using basic movement commands.",
    gridSize: 5,
    start: { x: 0, y: 0 },
    goal: { x: 4, y: 0 },
    obstacles: [],
    defaultCode: "// Type your commands below\n// Example: moveRight();\n\n",
    hint: "Use moveRight() multiple times to reach the flag."
  },
  {
    id: 2,
    title: "Loops: Don't Repeat Yourself",
    description: "The path is long. Use a 'for' loop to save time!",
    gridSize: 6,
    start: { x: 0, y: 2 },
    goal: { x: 5, y: 2 },
    obstacles: [
      { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1 },
      { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 },
    ],
    defaultCode: "for (let i = 0; i < 5; i++) {\n  // What goes here?\n  \n}",
    hint: "Put moveRight() inside the loop to run it 5 times."
  },
  {
    id: 3,
    title: "Navigation: The Maze",
    description: "Combine multiple commands to navigate around the obstacles.",
    gridSize: 5,
    start: { x: 0, y: 4 },
    goal: { x: 4, y: 0 },
    obstacles: [
      { x: 1, y: 4 }, { x: 1, y: 3 }, { x: 1, y: 2 },
      { x: 3, y: 0 }, { x: 3, y: 1 }, { x: 3, y: 2 }
    ],
    defaultCode: "// Navigate the maze\n\n",
    hint: "You'll need moveUp() and moveRight(). Watch out for the walls!"
  }
];

const CodeQuest = () => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const level = levels[currentLevelIndex];
  
  const [code, setCode] = useState(level.defaultCode);
  const [playerPos, setPlayerPos] = useState<Position>(level.start);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorLine, setErrorLine] = useState<string | null>(null);

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset when level changes
  useEffect(() => {
    setPlayerPos(level.start);
    setCode(level.defaultCode);
    setIsSuccess(false);
    setErrorLine(null);
  }, [currentLevelIndex, level]);

  const parseAndExecute = async () => {
    setIsPlaying(true);
    setErrorLine(null);
    setPlayerPos(level.start);
    
    // Tiny delay to simulate compilation and reset position
    await new Promise(resolve => setTimeout(resolve, 300));

    let currentPos = { ...level.start };
    let hasHitObstacle = false;

    // We build a list of moves to animate sequentially
    const moveQueue: Position[] = [];

    // Helper to simulate the user's grid moves
    const moveRight = () => { if (currentPos.x < level.gridSize - 1) currentPos.x += 1; moveQueue.push({...currentPos}); };
    const moveLeft = () => { if (currentPos.x > 0) currentPos.x -= 1; moveQueue.push({...currentPos}); };
    const moveUp = () => { if (currentPos.y > 0) currentPos.y -= 1; moveQueue.push({...currentPos}); };
    const moveDown = () => { if (currentPos.y < level.gridSize - 1) currentPos.y += 1; moveQueue.push({...currentPos}); };

    try {
      // DANGER: We use new Function here to parse the user's logic string safely within this specific scope.
      // We explicitly override window/document objects to prevent dom manipulation from the code string.
      const safeExecute = new Function(
        'moveRight', 'moveLeft', 'moveUp', 'moveDown', 'window', 'document', 'console',
        `
        try {
          ${code}
        } catch(e) {
          throw new Error(e.message);
        }
        `
      );

      // Run the user's code to populate the moveQueue
      safeExecute(moveRight, moveLeft, moveUp, moveDown, {}, {}, {});

      // Now animate through the queue
      for (const pos of moveQueue) {
        if (hasHitObstacle) break;

        // Check obstacles
        if (level.obstacles.some(obs => obs.x === pos.x && obs.y === pos.y)) {
          setErrorLine("Crash! You ran into an obstacle.");
          hasHitObstacle = true;
          break;
        }

        setPlayerPos(pos);
        // Wait between moves for animation feeling
        await new Promise(resolve => setTimeout(resolve, 400));
      }

      if (!hasHitObstacle) {
        // Did we reach the goal?
        if (currentPos.x === level.goal.x && currentPos.y === level.goal.y) {
          setIsSuccess(true);
        } else {
          setErrorLine("Execution finished, but you didn't reach the flag.");
        }
      }

    } catch (err: any) {
      setErrorLine(`Syntax Error: ${err.message}`);
    }

    setIsPlaying(false);
  };

  const handleReset = () => {
    setPlayerPos(level.start);
    setIsSuccess(false);
    setErrorLine(null);
    setIsPlaying(false);
  };

  const nextLevel = () => {
    if (currentLevelIndex < levels.length - 1) {
      setCurrentLevelIndex(prev => prev + 1);
    }
  };

  // Grid Cell Helper
  const isObstacle = (x: number, y: number) => level.obstacles.some(o => o.x === x && o.y === y);
  const isGoal = (x: number, y: number) => level.goal.x === x && level.goal.y === y;
  const isPlayer = (x: number, y: number) => playerPos.x === x && playerPos.y === y;

  return (
    <div id="code-quest" className="relative w-full max-w-6xl mx-auto py-12 px-4 scroll-mt-24">
      {isSuccess && windowSize.width > 0 && (
        <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={300} />
      )}

      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
          CodeQuest Arcade
        </Badge>
        <h2 className="text-4xl font-bold mb-4">Learn by Playing</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Type real Javascript code to navigate the grid. Master sequences, loops, and logic through interactive challenges!
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Side: Code Editor */}
        <Card className="flex-1 glass-card shadow-xl overflow-hidden flex flex-col">
          <CardHeader className="bg-background/50 border-b border-border py-4">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-primary">{level.id}</Badge>
                  {level.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">{level.description}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col bg-[#0d1117] min-h-[400px]">
            <div className="bg-[#161b22] px-4 py-2 text-xs text-muted-foreground font-mono flex items-center justify-between">
              <span>script.js</span>
              <span className="text-primary/70">{level.hint}</span>
            </div>
            
            <textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={isPlaying || isSuccess}
              className="flex-1 w-full bg-transparent text-gray-200 font-mono p-4 resize-none leading-relaxed focus:outline-none focus:ring-1 focus:ring-primary/50"
              spellCheck={false}
            />

            <div className="p-4 bg-background/50 border-t border-border flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={handleReset}
                disabled={isPlaying}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </Button>

              {!isSuccess ? (
                <Button 
                  onClick={parseAndExecute}
                  disabled={isPlaying}
                  className="gap-2 bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20"
                >
                  <Play className="w-4 h-4" /> {isPlaying ? "Running..." : "Execute"}
                </Button>
              ) : (
                <Button 
                  onClick={nextLevel}
                  className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse shadow-lg shadow-primary/30"
                >
                  {currentLevelIndex < levels.length - 1 ? "Next Level" : "Finish Game"} <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <AnimatePresence>
              {errorLine && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-red-500/10 border-t border-red-500/20 text-red-500 px-4 py-3 font-mono text-sm"
                >
                  {errorLine}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Right Side: Game Grid Visualizer */}
        <Card className="lg:w-[400px] xl:w-[500px] glass-card shadow-xl p-8 flex items-center justify-center bg-gradient-to-br from-background via-muted/50 to-background">
          <div 
            className="grid gap-2 relative" 
            style={{ 
              gridTemplateColumns: `repeat(${level.gridSize}, minmax(0, 1fr))`,
              width: "100%",
              aspectRatio: "1/1"
            }}
          >
            {/* Render Grid Cells */}
            {Array.from({ length: level.gridSize * level.gridSize }).map((_, i) => {
              const x = i % level.gridSize;
              const y = Math.floor(i / level.gridSize);
              
              const isObs = isObstacle(x, y);
              const isG = isGoal(x, y);

              return (
                <div 
                  key={i} 
                  className={`relative rounded-xl border-2 
                    ${isObs ? 'bg-slate-800 border-slate-700 shadow-inner' : 'bg-background/30 border-muted/30'}
                  `}
                >
                  {isG && !isSuccess && (
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: [0.8, 1.1, 0.8] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Trophy className="w-8 h-8 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                    </motion.div>
                  )}
                </div>
              );
            })}

            {/* Render Player Avatar */}
            <motion.div 
              layout
              initial={false}
              animate={{ 
                x: `calc(${playerPos.x * 100}% + ${playerPos.x * 8}px)`, // 8px is the gap
                y: `calc(${playerPos.y * 100}% + ${playerPos.y * 8}px)`
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute top-0 left-0 w-[calc(100%/${level.gridSize}-(${level.gridSize}-1)*8px/${level.gridSize})] aspect-square z-10 p-1"
            >
              <div className={`w-full h-full rounded-full shadow-lg flex items-center justify-center transition-colors duration-300
                ${isSuccess ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]' : 'bg-primary shadow-[0_0_15px_rgba(124,58,237,0.6)]'}
              `}>
                {isSuccess ? (
                  <CheckCircle2 className="w-6 h-6 text-white" />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-white animate-pulse" />
                )}
              </div>
            </motion.div>

          </div>
        </Card>

      </div>
    </div>
  );
};

export default CodeQuest;
