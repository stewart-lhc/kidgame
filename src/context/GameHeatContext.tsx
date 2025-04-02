import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { games } from '../data/games';

// 游戏热度信息接口
interface GameHeatData {
  id: string;
  heat: number;
}

// 上下文接口
interface GameHeatContextType {
  gameHeats: Record<string, number>; // 游戏ID到热度的映射
  increaseHeat: (id: string) => void; // 增加游戏热度的方法
  getGameHeat: (id: string) => number; // 获取游戏热度的方法
}

// 创建上下文
const GameHeatContext = createContext<GameHeatContextType | undefined>(undefined);

// 使用热度上下文的Hook
export function useGameHeat() {
  const context = useContext(GameHeatContext);
  if (!context) {
    throw new Error('useGameHeat must be used within a GameHeatProvider');
  }
  return context;
}

interface GameHeatProviderProps {
  children: ReactNode;
}

export function GameHeatProvider({ children }: GameHeatProviderProps) {
  // 从localStorage初始化游戏热度数据
  const [gameHeats, setGameHeats] = useState<Record<string, number>>(() => {
    const savedHeats = localStorage.getItem('gameHeats');
    if (savedHeats) {
      return JSON.parse(savedHeats);
    } else {
      // 如果没有保存的数据，初始化所有游戏的热度为games.ts中的默认值
      const initialHeats: Record<string, number> = {};
      games.forEach(game => {
        initialHeats[game.id] = game.heat || 0; // 确保heat不是undefined
      });
      return initialHeats;
    }
  });

  // 热度数据变化时保存到localStorage
  useEffect(() => {
    localStorage.setItem('gameHeats', JSON.stringify(gameHeats));
  }, [gameHeats]);

  // 增加游戏热度
  const increaseHeat = (id: string) => {
    setGameHeats(prevHeats => {
      const currentHeat = prevHeats[id] || 0;
      return {
        ...prevHeats,
        [id]: currentHeat + 1
      };
    });
  };

  // 获取游戏热度
  const getGameHeat = (id: string) => {
    return gameHeats[id] || 0;
  };

  const value = {
    gameHeats,
    increaseHeat,
    getGameHeat
  };

  return (
    <GameHeatContext.Provider value={value}>
      {children}
    </GameHeatContext.Provider>
  );
} 