interface SimilarityResult {
    title: string;
    similarity: number;
    matched: boolean;
}

interface SimilarityOptions {
    threshold?: number;
    exactMatch?: boolean;
    ignoreSpaces?: boolean;
    ignoreSpecialChars?: boolean;
}

class SimilarityChecker {
    private titles: string[];
    private options: Required<SimilarityOptions>;

    constructor(titles: string[], options: SimilarityOptions = {}) {
        this.titles = titles;
        this.options = {
            threshold: options.threshold ?? 0.3,
            exactMatch: options.exactMatch ?? false,
            ignoreSpaces: options.ignoreSpaces ?? true,
            ignoreSpecialChars: options.ignoreSpecialChars ?? true,
        };
    }

    private normalize(text: string): string {
        let normalized = text.toLowerCase();

        if (this.options.ignoreSpaces) {
            normalized = normalized.replace(/\s/g, "");
        }

        if (this.options.ignoreSpecialChars) {
            normalized = normalized.replace(/[^가-힣a-z0-9]/g, "");
        }

        return normalized;
    }

    private levenshteinDistance(str1: string, str2: string): number {
        const matrix: number[][] = [];
        const len1 = str1.length;
        const len2 = str2.length;

        for (let i = 0; i <= len1; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= len2; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= len1; i++) {
            for (let j = 1; j <= len2; j++) {
                const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + cost
                );
            }
        }

        return matrix[len1][len2];
    }

    private calculateSimilarity(query: string, target: string): number {
        const normalizedQuery = this.normalize(query);
        const normalizedTarget = this.normalize(target);

        if (normalizedTarget.includes(normalizedQuery)) {
            return 1.0;
        }

        const distance = this.levenshteinDistance(
            normalizedQuery,
            normalizedTarget
        );
        const maxLength = Math.max(
            normalizedQuery.length,
            normalizedTarget.length
        );

        if (maxLength === 0) return 1.0;

        const similarity = 1 - distance / maxLength;

        const lengthRatio =
            Math.min(normalizedQuery.length, normalizedTarget.length) /
            Math.max(normalizedQuery.length, normalizedTarget.length);

        return similarity * (0.7 + 0.3 * lengthRatio);
    }

    private jaccardSimilarity(query: string, target: string): number {
        const normalizedQuery = this.normalize(query);
        const normalizedTarget = this.normalize(target);

        const set1 = new Set(normalizedQuery.split(""));
        const set2 = new Set(normalizedTarget.split(""));

        const intersection = new Set([...set1].filter((x) => set2.has(x)));
        const union = new Set([...set1, ...set2]);

        return union.size === 0 ? 0 : intersection.size / union.size;
    }

    private comprehensiveSimilarity(query: string, target: string): number {
        const levenshteinSim = this.calculateSimilarity(query, target);
        const jaccardSim = this.jaccardSimilarity(query, target);

        return levenshteinSim * 0.7 + jaccardSim * 0.3;
    }

    public search(query: string): SimilarityResult[] {
        const results: SimilarityResult[] = this.titles.map((title) => {
            const similarity = this.comprehensiveSimilarity(query, title);
            return {
                title,
                similarity,
                matched: similarity >= this.options.threshold,
            };
        });

        return results.sort((a, b) => b.similarity - a.similarity);
    }

    public isMatch(query: string): boolean {
        const results = this.search(query);
        return results.some((result) => result.matched);
    }

    public getBestMatch(query: string): SimilarityResult | null {
        const results = this.search(query);
        const bestMatch = results[0];

        return bestMatch && bestMatch.matched ? bestMatch : null;
    }

    public getAllMatches(query: string): SimilarityResult[] {
        return this.search(query).filter((result) => result.matched);
    }
}

const animeList = [
    "봇치 더 록!",
    "그 비스크 돌은 사랑을 한다",
    "2.5차원의 유혹",
    "시운지 가의 아이들",
    "여친, 빌리겠습니다",
];

const checker = new SimilarityChecker(animeList, {
    threshold: 0.4,
    ignoreSpaces: true,
    ignoreSpecialChars: true,
});

console.log('"비스크돌" 검색 결과:');
const biskResult = checker.search("비스크돌");
biskResult.forEach((result) => {
    console.log(
        `${result.title}: ${(result.similarity * 100).toFixed(1)}% ${
            result.matched ? "✓" : "✗"
        }`
    );
});

console.log('\n"봇치더락" 검색 결과:');
const botchiResult = checker.search("봇치더락");
botchiResult.forEach((result) => {
    console.log(
        `${result.title}: ${(result.similarity * 100).toFixed(1)}% ${
            result.matched ? "✓" : "✗"
        }`
    );
});

console.log('\n"시운지" 검색 결과:');
const siunjiResult = checker.search("시운지");
siunjiResult.forEach((result) => {
    console.log(
        `${result.title}: ${(result.similarity * 100).toFixed(1)}% ${
            result.matched ? "✓" : "✗"
        }`
    );
});

console.log('\n"여친빌리겠습니다" 검색 결과:');
const girlfriendResult = checker.search("여친빌리겠습니다");
girlfriendResult.forEach((result) => {
    console.log(
        `${result.title}: ${(result.similarity * 100).toFixed(1)}% ${
            result.matched ? "✓" : "✗"
        }`
    );
});

export function findSimilarTitles(
    query: string,
    titles: string[],
    threshold: number = 0.4
): string[] {
    const checker = new SimilarityChecker(titles, { threshold });
    return checker.getAllMatches(query).map((result) => result.title);
}

export function isMatchFound(
    query: string,
    titles: string[],
    threshold: number = 0.4
): boolean {
    const checker = new SimilarityChecker(titles, { threshold });
    return checker.isMatch(query);
}
