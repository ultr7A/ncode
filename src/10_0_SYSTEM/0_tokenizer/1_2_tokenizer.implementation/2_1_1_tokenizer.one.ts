import { LookupIdent, Token, TypedTokenLiteral } from "../../../01_1_ELEMENT/1_token_💧/2_1_token.js"
import { AbstractTokenizer, ITokenizer } from "../0_1_tokenizer-core/0_2_abstract-tokenizer.js"


/***
 * /T\__________[=]
 * ----------------
 *              Tokenizer
 * 
 * of           [linear character sequences]
 * 
 * ----------------
 * (+)__________<Z>
 */
export class TokenizerOne extends    AbstractTokenizer<string, TypedTokenLiteral> 
                          implements ITokenizer       <number, string>
{

    constructor() {
        super() 
        console.log("** Construct new TokenizerOne **")

    }

    coordinates = {
        readPosition: 0,
        position:     0
    }

    public ch: string = "";
    public code = "";

    lineNumber = 1; //TODO: Make part of CodeCoordinates?

    getInputLength(): number {
        return this.code.length;
    }

    skipWhitespace(): void {
        while (this.ch == ' ' || this.ch == '\t' || this.ch == '\r' || this.isNewLine()) {
            this.readChar();
        }
    }

    loadSourceCode(input: string): void {
        this.coordinates.position = 0;
        this.coordinates.readPosition = 0;
        this.lineNumber = 1;
        this.ch = "";

        this.code = input;
        this.readChar();
    };

    peekChar(): string {
        if (this.coordinates.readPosition >= this.code.length) {
            return 'Ω';
        } else {
            return this.code[this.coordinates.readPosition];
        }
    }
    
    public readChar(): void {
        this.ch = this.peekChar();
        this.coordinates.position = this.coordinates.readPosition;
        this.coordinates.readPosition += 1;
    }

    public readNumber(): [boolean, string] {
        const position   = this.coordinates.position; 
        let   floating   = false;

        while (this.isDigit(this.ch)) {
            if (this.ch == ".") {
                floating = true;
            }
            this.readChar();
        }
        return [floating, this.code.substring(position, this.coordinates.position)];
    }

    public readString(endChar: string): string {
        var position = this.coordinates.position + 1;

        while (true) {
            this.readChar();
            if (this.ch == endChar) {
                break;
            }
        }
        return this.code.substring(position, this.coordinates.position);
    } 

    public newToken(tokenType: Token,   ch: string): TypedTokenLiteral {
        return { Type: tokenType, Literal: ch };
    }

    public isNewLine(): boolean {
        let newLine = this.ch == '\n';

        if (newLine) {
            this.lineNumber++;
        }
        return newLine;
    }

    private readIdentifier() {
        var position = this.coordinates.position;

        if (this.isLetter(this.ch)) {
            this.readChar();
        }
        while (this.isLetter(this.ch) || this.isWholeDigit(this.ch)) {
            this.readChar();
        }
        return this.code.substring(position, this.coordinates.position);
    }

    public NextToken(): TypedTokenLiteral {
        let token: TypedTokenLiteral = null, 
            num;
            
        this.skipWhitespace();
        switch (this.ch) {
            case '=':
                if (this.peekChar() == '=') {
                    token.Literal = this.ch + this.peekChar();
                    token.Type = Token.EQ;
                    this.readChar();
                }
                else {
                    token = this.newToken(Token.ASSIGN, this.ch);
                }
                break;
            case '&':
                if (this.peekChar() == '&') {
                    this.readChar();
                }
                token = this.newToken(Token.AND, this.ch + '&');
                break;
            case '|':
                if (this.peekChar() == '|') {
                    this.readChar();
                }
                token = this.newToken(Token.OR, this.ch + '|');
                break;
            case '.':
                token = this.newToken(Token.DOT,       this.ch);
                break;
            case '+':
                token = this.newToken(Token.PLUS,      this.ch);
                break;
            case ',':
                token = this.newToken(Token.COMMA,     this.ch);
                break;
            case ';':
                token = this.newToken(Token.SEMICOLON, this.ch);
                break;
            case ':':
                token = this.newToken(Token.COLON,     this.ch);
                break;
            case '(':
                token = this.newToken(Token.LPAREN,    this.ch);
                break;
            case ')':
                if (this.peekChar() == '#') {
                    token = this.newToken(Token.RPAREN_POUND, this.ch + '#');
                    this.readChar();
                } else if (this.peekChar() == '*') {
                    token = this.newToken(Token.RPAREN_ASTERISK, this.ch + '*');
                    this.readChar();
                } else {
                    token = this.newToken(Token.RPAREN, this.ch);
                }
                break;
            case '{':
                token = this.newToken(Token.LBRACE, this.ch);
                break;
            case '}':
                if (this.peekChar() == '#') {
                    token = this.newToken(Token.RBRACE_POUND, this.ch + '#');
                    this.readChar();
                } else if (this.peekChar() == '*') {
                    token = this.newToken(Token.RBRACE_ASTERISK, this.ch + '*');
                    this.readChar();
                } else {
                    token = this.newToken(Token.RBRACE, this.ch);
                }
                break;
            case '[':
                token = this.newToken(Token.LBRACKET, this.ch);
                break;
            case ']':
                if (this.peekChar() == '#') {
                    token = this.newToken(Token.RBRACKET_POUND, this.ch + '#');
                    this.readChar();
                } else if (this.peekChar() == '*') {
                    token = this.newToken(Token.RBRACKET_ASTERISK, this.ch + '*');
                    this.readChar();
                } else {
                    token = this.newToken(Token.RBRACKET, this.ch);
                }
                break;
            case '!':
                if (this.peekChar() == '=') {
                    token.Literal = this.ch + this.peekChar();
                    token.Type = Token.NOT_EQ;
                    this.readChar();
                }
                else {
                    token = this.newToken(Token.BANG, this.ch);
                }
                break;
            case '-':
                if (this.peekChar() == '>') {
                    token.Literal = this.ch + '>';
                    token.Type = Token.SOURCE;
                    this.readChar();
                }
                else {
                    token = this.newToken(Token.MINUS, this.ch);
                }
                break;
            case '/':
                if (this.peekChar() == '*') {
                    token = this.newToken(Token.LCOMMENT, this.ch + '*');
                    this.readChar();
                    break;
                }
                else {
                    token = this.newToken(Token.SLASH, this.ch);
                    break;
                }
            case '*':
                if (this.peekChar() == '/') {
                    token = this.newToken(Token.RCOMMENT, this.ch + '/');
                    this.readChar();
                } else if (this.peekChar() == '(') { 
                    token = this.newToken(Token.ASTERISK_LPAREN, this.ch + '(');
                    this.readChar();
                } else if (this.peekChar() == '{') { 
                    token = this.newToken(Token.ASTERISK_LBRACE, this.ch + '{');
                    this.readChar();
                } else if (this.peekChar() == '[') { 
                    token = this.newToken(Token.ASTERISK_LBRACKET, this.ch + '[');
                    this.readChar();
                } else {
                    token = this.newToken(Token.ASTERISK, this.ch);
                }
                break;
            case '#':
                if (this.peekChar() == '(') {
                    token = this.newToken(Token.POUND_LPAREN, this.ch + '(');
                    this.readChar();
                } else if (this.peekChar() == '{') { 
                    token = this.newToken(Token.POUND_LBRACE, this.ch + '{');
                    this.readChar();
                } else if (this.peekChar() == '[') { 
                    token = this.newToken(Token.POUND_LBRACKET, this.ch + '[');
                    this.readChar();
                } else {
                    token = this.newToken(Token.ASTERISK, this.ch);
                }
                break;
            case '%':
                token = this.newToken(Token.MOD, this.ch);
                break;
            case '<':
                if (this.peekChar() == '-') {
                    token.Literal = this.ch + '-';
                    token.Type = Token.SINK;
                    this.readChar();
                }
                else {
                    token = this.newToken(Token.LT, this.ch);
                    break;
                }
            case '>':
                token = this.newToken(Token.GT, this.ch);
                break;
            case '"':
            case "'":
                token.Type = Token.STRING;
                token.Literal = this.readString(this.ch);
                break;
            case 'Ω':
                token.Literal = "Ω";
                token.Type = Token.EOF;
                break;
            default:
                token = { Literal: '', Type: Token.ILLEGAL };
                
                if (this.isLetter(this.ch)) {
                    token.Literal = this.readIdentifier();
                    token.Type = LookupIdent(token.Literal);
                    return token;
                }
                else if (this.isDigit(this.ch)) {
                    num = this.readNumber();
                    token.Literal = num[1];
                    token.Type = num[0] ? Token.FLOAT : Token.INT;
                    return token;
                }
                else {
                    token = this.newToken(Token.ILLEGAL, this.ch);
                }
        }
        this.readChar();
        return token;
    }
}