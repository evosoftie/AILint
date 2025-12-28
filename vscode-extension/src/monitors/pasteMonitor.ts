import * as vscode from 'vscode';

interface PasteEvent {
    timestamp: number;
    size: number;
    content: string;
    source?: 'clipboard' | 'external';
}

export class PasteMonitor {
    private pastes: PasteEvent[] = [];
    private readonly LARGE_PASTE_THRESHOLD = 100; // lines
    
    constructor() {
        vscode.workspace.onDidChangeTextDocument(this.detectPaste, this);
    }
    
    private detectPaste(event: vscode.TextDocumentChangeEvent) {
        for (const change of event.contentChanges) {
            // Heuristic: Large single change likely a paste
            const lineCount = change.text.split('\n').length;
            
            if (lineCount > 10) {
                this.pastes.push({
                    timestamp: Date.now(),
                    size: lineCount,
                    content: change.text,
                    source: this.detectSource(change.text)
                });
            }
        }
    }
    
    private detectSource(text: string): 'clipboard' | 'external' | undefined {
        // Try to detect if this came from external AI tool
        // Look for characteristic formatting, comments, etc.
        
        if (this.hasAICommentPattern(text)) {
            return 'external';
        }
        
        return 'clipboard';
    }
    
    private hasAICommentPattern(text: string): boolean {
        // AI-generated code often has specific comment patterns
        const patterns = [
            /\/\/ Helper function to/,
            /\/\/ This function/,
            /"""[\s\S]*Args:[\s\S]*Returns:/,  // Python docstring
        ];
        
        return patterns.some(p => p.test(text));
    }
    
    public getScore(document: vscode.TextDocument): number {
        const largePastes = this.pastes.filter(p => p.size > this.LARGE_PASTE_THRESHOLD);
        const totalLines = document.lineCount;
        const pastedLines = largePastes.reduce((sum, p) => sum + p.size, 0);
        
        // If >30% of file came from large pastes, suspicious
        return Math.min((pastedLines / totalLines) / 0.3, 1.0);
    }
}
