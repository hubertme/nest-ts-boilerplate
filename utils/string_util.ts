export default class StringUtil {
    static isBlank(str: string): boolean {
        return str == null || str.trim() === '';
    }

    static isNotBlank(str: string): boolean {
        return !StringUtil.isBlank(str);
    }
    
    static truncate(str: string, length: number, suffix: string = '...'): string {
        return str.length > length ? str.substring(0, length) + suffix : str;
    }

    static capitaliseFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    static toCamelCaseFromSnake(str: string): string {
        return str.replace(/_([a-z])/g, function (g) { 
            return g[1].toUpperCase();
        });
    }

    static toCamelCaseFromKebab(str: string): string {
        return str.replace(/-([a-z])/g, function (g) { 
            return g[1].toUpperCase();
        });
    }

    static toKebabCaseFromCamel(str: string): string {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }

    static toSnakeCaseFromCamel(str: string): string {
        return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    }
    
    static startsWith(str: string, prefix: string): boolean {
        if (prefix == null || prefix == undefined) {
            return false;
        } else if (prefix === '') {
            return true;
        }
        return str.indexOf(prefix) === 0;
    }

    static endsWith(str: string, suffix: string): boolean {
        if (suffix == null || suffix == undefined) {
            return false;
        } else if (suffix === '') {
            return true;
        }
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    static contains(str: string, search: string): boolean {
        if (!search) {
            return false;
        }
        return str.indexOf(search) !== -1;
    }

    static replaceAll(str: string, search: string, replacement: string): string {
        if (!search) {
            return str;
        } else if (replacement == null || replacement == undefined) {
            return str;
        }
        return str.split(search).join(replacement);
    }

    static removeSubstring(str: string, search: string): string {
        if (!search) {
            return str;
        }
        return StringUtil.replaceAll(str, search, '');
    }

    static addPrefix(str: string, prefix: string): string {
        if (!prefix) {
            return str;
        }
        return StringUtil.startsWith(str, prefix) ? str : prefix + str;
    }

    static addSuffix(str: string, suffix: string): string {
        if (!suffix) {
            return str;
        }
        return StringUtil.endsWith(str, suffix) ? str : str + suffix;
    }

    static reverse(str: string): string {
        if (!str) {
            return str;
        }
        return str.split('').reverse().join('');
    }

    static removeWhitespaces(str: string): string {
        if (!str) {
            return str;
        }
        return str.replace(/\s/g, '');
    }
}