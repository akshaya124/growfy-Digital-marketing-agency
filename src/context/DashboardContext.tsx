"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Types
export type Notification = {
  id: string;
  message: string;
  date: string;
  read: boolean;
  target: "client" | "team" | "all";
};

export type CalendarEvent = {
  id: string;
  title: string;
  type: "meeting" | "post" | "email" | "video";
  date: string;
  status: "Draft" | "In Review" | "Scheduled" | "Published" | "Completed";
  description?: string;
};

interface DashboardContextType {
  notifications: Notification[];
  events: CalendarEvent[];
  addNotification: (notification: Omit<Notification, "id" | "read">) => void;
  addEvent: (event: Omit<CalendarEvent, "id">) => void;
  markNotificationRead: (id: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Initialize with some dummy data on mount
  useEffect(() => {
    setNotifications([
      { id: "1", message: "Welcome to your new dashboard!", date: new Date().toISOString(), read: false, target: "all" }
    ]);

    // Initial calendar events for Content Calendar
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 5);

    setEvents([
      {
        id: "e1",
        title: "Q3 Strategy Meeting",
        type: "meeting",
        date: tomorrow.toISOString(),
        status: "Scheduled",
        description: "Monthly check-in with the team."
      },
      {
        id: "e2",
        title: "Instagram Reel: Growth Tips",
        type: "post",
        date: today.toISOString(),
        status: "In Review",
        description: "Video asset pending client approval."
      },
      {
        id: "e3",
        title: "Weekly Newsletter",
        type: "email",
        date: nextWeek.toISOString(),
        status: "Draft",
        description: "Drafting the email copy."
      }
    ]);
  }, []);

  const addNotification = (notif: Omit<Notification, "id" | "read">) => {
    setNotifications(prev => [
      { ...notif, id: Math.random().toString(36).substr(2, 9), read: false },
      ...prev
    ]);
  };

  const addEvent = (evt: Omit<CalendarEvent, "id">) => {
    setEvents(prev => [
      { ...evt, id: Math.random().toString(36).substr(2, 9) },
      ...prev
    ]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <DashboardContext.Provider value={{ notifications, events, addNotification, addEvent, markNotificationRead }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
