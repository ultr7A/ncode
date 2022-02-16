import { Token, TypedTokenLiteral } from "../../../01_2_Sequence_📘🌊/1_token_💧/2_1_token";
import { AbstractTokenizer } from "../0_1_tokenizer-core/0_2_abstract-tokenizer";


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
export class TokenizerOne extends AbstractTokenizer<number, string, string, TypedTokenLiteral> {

    coordinates = {
        readPosition: 0,
        position:     0
    }

    public ch: string = "";
    public code = "";

    lineNumber = 1; //TODO: Make part of CodeCoordinates?

    getInputLength() {
        return this.code.length;
    }

    skipWhitespace() {
        while (this.ch == ' ' || this.ch == '\t' || this.ch == '\r' || this.isNewLine()) {
            this.readChar();
        }
    }

    loadSourceCode(input: string) {
        this.coordinates.position = 0;
        this.coordinates.readPosition = 0;
        this.lineNumber = 1;
        this.ch = "";
        this.code = input;
    };

    peekChar() {
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
        let tok: TypedTokenLiteral = null, 
            num;
            
        this.skipWhitespace();
        switch (this.ch) {
            case '=':
                if (this.peekChar() == '=') {
                    tok.Literal = this.ch + this.peekChar();
                    tok.Type = Token.EQ;
                    this.readChar();
                }
                else {
                    tok = this.newToken(Token.ASSIGN, this.ch);
                }
                break;
            case '&':
                if (this.peekChar() == '&') {
                    this.readChar();
                }
                tok = this.newToken(Token.AND, this.ch + '&');
                break;
            case '|':
                if (this.peekChar() == '|') {
                    this.readChar();
                }
                tok = this.newToken(Token.OR, this.ch + '|');
                break;
            case '.':
                tok = this.newToken(Token.DOT,       this.ch);
                break;
            case '+':
                tok = this.newToken(Token.PLUS,      this.ch);
                break;
            case ',':
                tok = this.newToken(Token.COMMA,     this.ch);
                break;
            case ';':
                tok = this.newToken(Token.SEMICOLON, this.ch);
                break;
            case ':':
                tok = this.newToken(Token.COLON,     this.ch);
                break;
            case '(':
                tok = this.newToken(Token.LPAREN,    this.ch);
                break;
            case ')':
                if (this.peekChar() == '#') {
                    tok = this.newToken(Token.RPAREN_POUND, this.ch + '#');
                    this.readChar();
                } else if (this.peekChar() == '*') {
                    tok = this.newToken(Token.RPAREN_ASTERISK, this.ch + '*');
                    this.readChar();
                } else {
                    tok = this.newToken(Token.RPAREN, this.ch);
                }
                break;
            case '{':
                tok = this.newToken(Token.LBRACE, this.ch);
                break;
            case '}':
                if (this.peekChar() == '#') {
                    tok = this.newToken(Token.RBRACE_POUND, this.ch + '#');
                    this.readChar();
                } else if (this.peekChar() == '*') {
                    tok = this.newToken(Token.RBRACE_ASTERISK, this.ch + '*');
                    this.readChar();
                } else {
                    tok = this.newToken(Token.RBRACE, this.ch);
                }
                break;
            case '[':
                tok = this.newToken(Token.LBRACKET, this.ch);
                break;
            case ']':
                if (this.peekChar() == '#') {
                    tok = this.newToken(Token.RBRACKET_POUND, this.ch + '#');
                    this.readChar();
                } else if (this.peekChar() == '*') {
                    tok = this.newToken(Token.RBRACKET_ASTERISK, this.ch + '*');
                    this.readChar();
                } else {
                    tok = this.newToken(Token.RBRACKET, this.ch);
                }
                break;
            case '!':
                if (this.peekChar() == '=') {
                    tok.Literal = this.ch + this.peekChar();
                    tok.Type = Token.NOT_EQ;
                    this.readChar();
                }
                else {
                    tok = this.newToken(Token.BANG, this.ch);
                }
                break;
            case '-':
                if (this.peekChar() == '>') {
                    tok.Literal = this.ch + '>';
                    tok.Type = Token.SOURCE;
                    this.readChar();
                }
                else {
                    tok = this.newToken(Token.MINUS, this.ch);
                }
                break;
            case '/':
                if (this.peekChar() == '*') {
                    tok = this.newToken(Token.LCOMMENT, this.ch + '*');
                    this.readChar();
                    break;
                }
                else {
                    tok = this.newToken(Token.SLASH, this.ch);
                    break;
                }
            case '*':
                if (this.peekChar() == '/') {
                    tok = this.newToken(Token.RCOMMENT, this.ch + '/');
                    this.readChar();
                } else if (this.peekChar() == '(') { 
                    tok = this.newToken(Token.ASTERISK_LPAREN, this.ch + '(');
                    this.readChar();
                } else if (this.peekChar() == '{') { 
                    tok = this.newToken(Token.ASTERISK_LBRACE, this.ch + '{');
                    this.readChar();
                } else if (this.peekChar() == '[') { 
                    tok = this.newToken(Token.ASTERISK_LBRACKET, this.ch + '[');
                    this.readChar();
                } else {
                    tok = this.newToken(Token.ASTERISK, this.ch);
                }
                break;
            case '#':
                if (this.peekChar() == '(') {
                    tok = this.newToken(Token.POUND_LPAREN, this.ch + '(');
                    this.readChar();
                } else if (this.peekChar() == '{') { 
                    tok = this.newToken(Token.POUND_LBRACE, this.ch + '{');
                    this.readChar();
                } else if (this.peekChar() == '[') { 
                    tok = this.newToken(Token.POUND_LBRACKET, this.ch + '[');
                    this.readChar();
                } else {
                    tok = this.newToken(Token.ASTERISK, this.ch);
                }
                break;
            case '%':
                tok = this.newToken(Token.MOD, this.ch);
                break;
            case '<':
                if (this.peekChar() == '-') {
                    tok.Literal = this.ch + '-';
                    tok.Type = Token.SINK;
                    this.readChar();
                }
                else {
                    tok = this.newToken(Token.LT, this.ch);
                    break;
                }
            case '>':
                tok = this.newToken(Token.GT, this.ch);
                break;
            case '"':
            case "'":
                tok.Type = Token.STRING;
                tok.Literal = this.readString(this.ch);
                break;
            case 'Ω':
                tok.Literal = "Ω";
                tok.Type = Token.EOF;
                break;
            default:
                if (this.isLetter(this.ch)) {
                    tok.Literal = this.readIdentifier();
                    tok.Type = LookupIdent(tok.Literal);
                    return tok;
                }
                else if (this.isDigit(this.ch)) {
                    num = this.readNumber();
                    tok.Literal = num[1];
                    tok.Type = num[0] ? Token.FLOAT : Token.INT;
                    return tok;
                }
                else {
                    tok = this.newToken(Token.ILLEGAL, this.ch);
                }
        }
        this.readChar();
        return tok;
    }
}