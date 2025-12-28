import * as vscode from 'vscode';
import { execSync } from 'child_process';
import { AnalysisResult } from '../analysis/analyzer';

export class GitIntegration {
    public async addMetadata(
        file: string,
        analysis: AnalysisResult
    ): Promise<void> {
        // Store analysis in git notes
        const metadata = {
            ailint_version: '0.1.0',
            confidence: analysis.confidence,
            components: analysis.components,
            timestamp: analysis.timestamp
        };
        
        const metadataJson = JSON.stringify(metadata);
        
        // Add to git notes
        try {
            execSync(
                `git notes --ref=ailint add -f -m '${metadataJson}' HEAD`,
                { cwd: vscode.workspace.rootPath }
            );
        } catch (error) {
            console.error('Failed to add git notes:', error);
        }
    }
    
    public async installHook(): Promise<void> {
        // Install pre-commit hook
        const hookPath = `${vscode.workspace.rootPath}/.git/hooks/pre-commit`;
        const hookContent = `#!/bin/bash
# AILint pre-commit hook
# Analyzes staged changes for AI influence

ailint analyze --staged --format=git-notes
`;
        
        // Write hook file
        // Make executable
        // etc.
    }
}
