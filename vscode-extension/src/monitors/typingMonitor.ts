import * as vscode from 'vscode';

interface TypingEvent {
    timestamp: number;
    charactersAdded: number;
    position: vscode.Position;
    velocityScore: number;  // chars/second
}

export class TypingMonitor {
    private events: TypingEvent[] = [];
    private readonly WINDOW_SIZE = 5000; // 5 seconds
    private readonly SUSPICIOUS_VELOCITY = 500; // chars/sec (humanly impossible)
    
    constructor(private context: vscode.ExtensionContext) {
        // Listen to document changes
        vscode.workspace.onDidChangeTextDocument(this.onDocumentChange, this);
    }
    
    private onDocumentChange(event: vscode.TextDocumentChangeEvent) {
        for (const change of event.contentChanges) {
            const charsAdded = change.text.length;
            const now = Date.now();
            
            // Calculate velocity
            const recentEvents = this.getRecentEvents(now);
            const velocity = this.calculateVelocity(recentEvents, charsAdded);
            
            this.events.push({
                timestamp: now,
                charactersAdded: charsAdded,
                position: change.range.start,
                velocityScore: velocity
            });
            
            // Cleanup old events
            this.pruneEvents(now);
        }
    }
    
    private calculateVelocity(events: TypingEvent[], newChars: number): number {
        if (events.length === 0) return 0;
        
        const timeSpan = Date.now() - events[0].timestamp;
        const totalChars = events.reduce((sum, e) => sum + e.charactersAdded, newChars);
        
        return (totalChars / timeSpan) * 1000; // chars per second
    }
    
    public getAnomalyScore(document: vscode.TextDocument): number {
        // Return 0-1 score based on typing anomalies
        const suspiciousEvents = this.events.filter(
            e => e.velocityScore > this.SUSPICIOUS_VELOCITY
        );
        
        return Math.min(suspiciousEvents.length / 10, 1.0);
    }
    
    private getRecentEvents(now: number): TypingEvent[] {
        return this.events.filter(e => now - e.timestamp < this.WINDOW_SIZE);
    }
    
    private pruneEvents(now: number) {
        this.events = this.events.filter(e => now - e.timestamp < this.WINDOW_SIZE * 2);
    }
}
