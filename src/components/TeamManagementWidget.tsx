"use client";

import { useState, useEffect } from "react";
import { inviteTeamMember, removeTeamMember, getWhitelistedMembers } from "@/lib/firestore-helpers";
import { Users, UserPlus, UserMinus, Loader2 } from "lucide-react";
import { Button } from "./ui/button";

export default function TeamManagementWidget() {
  const [email, setEmail] = useState("");
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    const { members } = await getWhitelistedMembers();
    if (members) {
      setMembers(members);
    }
    setLoading(false);
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setActionLoading(true);
    await inviteTeamMember(email);
    setEmail("");
    await fetchMembers();
    setActionLoading(false);
  };

  const handleRemoveMember = async (targetEmail: string) => {
    if (!confirm(`Are you sure you want to revoke access for ${targetEmail}?`)) return;
    setActionLoading(true);
    await removeTeamMember(targetEmail);
    await fetchMembers();
    setActionLoading(false);
  };

  return (
    <div className="glass-card rounded-3xl border border-border bg-background overflow-hidden flex flex-col">
      <div className="p-6 border-b border-border flex justify-between items-center shrink-0">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Users className="text-primary w-5 h-5"/> Team Management
        </h2>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleAddMember} className="flex gap-2 mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="New member email"
            required
            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none text-sm"
          />
          <Button type="submit" disabled={actionLoading} className="rounded-xl flex gap-2">
            {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
            Add
          </Button>
        </form>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Whitelisted Members</h3>
          
          {loading ? (
            <div className="flex justify-center py-4"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground"/></div>
          ) : members.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No team members added yet.</p>
          ) : (
            members.map((m) => (
              <div key={m.email} className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-sm font-medium truncate">{m.email}</span>
                <button 
                  onClick={() => handleRemoveMember(m.email)}
                  disabled={actionLoading}
                  className="text-red-400 hover:text-red-300 transition-colors p-1"
                  title="Remove access"
                >
                  <UserMinus className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
