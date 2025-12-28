import * as vscode from 'vscode';
import { TypingMonitor } from '../monitors/typingMonitor';
import { PasteMonitor } from '../monitors/pasteMonitor';
import { LocalEngine } from './localEngine';

export interface AnalysisResult {
    confidence: number;  // 0-1
    components: {
        typingAnomaly: number;
        pastePattern: number;
        codeFingerprint: number;
        metadataCorrelation: number;
    };
    explanation: string;
    timestamp: number;
}

export class Analyzer {
    constructor(
        private typingMonitor: TypingMonitor,
        private pasteMonitor: PasteMonitor,
        private localEngine: LocalEngine
    ) {}
    
    public async analyze(document: vscode.TextDocument): Promise<AnalysisResult> {
        // Component scores (each 0-1)
        const typingScore = this.typingMonitor.getAnomalyScore(document);
        const pasteScore = this.pasteMonitor.getScore(document);
        
        // Code fingerprint analysis (calls Python engine)
        const fingerprintScore = await this.localEngine.analyzeCode(
            document.getText(),
            { language: document.languageId }
        );
        
        // Metadata correlation (check git history, etc.)
        const metadataScore = await this.analyzeMetadata(document);
        
        // Weighted combination
        const weights = {
            typing: 0.2,
            paste: 0.3,
            fingerprint: 0.4,
            metadata: 0.1
        };
        
        const confidence = 
            typingScore * weights.typing +
            pasteScore * weights.paste +
            fingerprintScore * weights.fingerprint +
            metadataScore * weights.metadata;
        
        return {
            confidence,
            components: {
                typingAnomaly: typingScore,
                pastePattern: pasteScore,
                codeFingerprint: fingerprintScore,
                metadataCorrelation: metadataScore
            },
            explanation: this.generateExplanation(confidence, {
                typingScore,
                pasteScore,
                fingerprintScore,
                metadataScore
            }),
            timestamp: Date.now()
        };
    }
    
    private async analyzeMetadata(document: vscode.TextDocument): Promise<number> {
        // Check git history patterns, copilot telemetry, etc.
        // Returns 0-1 score
        return 0.0; // Placeholder
    }
    
    private generateExplanation(confidence: number, scores: any): string {
        const reasons: string[] = [];
        
        if (scores.typingScore > 0.6) {
            reasons.push('Unusually high typing velocity detected');
        }
        if (scores.pasteScore > 0.6) {
            reasons.push('Large paste events detected');
        }
        if (scores.fingerprintScore > 0.6) {
            reasons.push('Code structure matches known AI patterns');
        }
        
        if (reasons.length === 0) {
            return `Low AI likelihood (${(confidence * 100).toFixed(0)}%)`;
        }
        
        return `Potentially AI-influenced (${(confidence * 100).toFixed(0)}%): ${reasons.join(', ')}`;
    }
}
