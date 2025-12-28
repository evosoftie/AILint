import * as vscode from 'vscode';
import { AnalysisResult } from '../analysis/analyzer';

export class StatusBarUI {
    private statusBarItem: vscode.StatusBarItem;
    
    constructor() {
        this.statusBarItem = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Right,
            100
        );
        this.statusBarItem.show();
    }
    
    public update(analysis: AnalysisResult | null) {
        if (!analysis) {
            this.statusBarItem.text = '$(check) AILint: Ready';
            this.statusBarItem.tooltip = 'No AI influence detected';
            this.statusBarItem.backgroundColor = undefined;
            return;
        }
        
        const percentage = (analysis.confidence * 100).toFixed(0);
        
        if (analysis.confidence < 0.3) {
            // Low likelihood
            this.statusBarItem.text = `$(check) AI: ${percentage}%`;
            this.statusBarItem.backgroundColor = undefined;
        } else if (analysis.confidence < 0.7) {
            // Medium likelihood
            this.statusBarItem.text = `$(warning) AI: ${percentage}%`;
            this.statusBarItem.backgroundColor = new vscode.ThemeColor(
                'statusBarItem.warningBackground'
            );
        } else {
            // High likelihood
            this.statusBarItem.text = `$(alert) AI: ${percentage}%`;
            this.statusBarItem.backgroundColor = new vscode.ThemeColor(
                'statusBarItem.errorBackground'
            );
        }
        
        this.statusBarItem.tooltip = analysis.explanation;
        this.statusBarItem.command = 'ailint.showDetails';
    }
}
