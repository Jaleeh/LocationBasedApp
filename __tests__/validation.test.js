/* 
    Jest Tests for form validation
*/
import 'react-native';
import Validation from '../app/config/validation';

const invalidEmails = [
    'email',
    'email@com',
    'email*@email.co.uk',
    'email@email@co.uk',
    'email.co.uk',
    'emailATemail.com',
    'email @ email . com',
    'email@email@email.com',
    '@email.com',
    '@email.co.uk'
];

const validEmails = [
    'email@email.com',
    'email@co.uk',
    'EMAIL@EMAIL.COM',
    'mr.email@email.co.uk',
    'email.email2021@email.com',
    'email@email.ac.uk',
    'email_email.email@email.org',
    'email@email.net',
    'Email@email.org.uk',
    'eMaiL@eMail.gov.uk'
];


const validPasswords = [
    'abcABC123!',
    'ababajiofD12!',
    'Jvb78!£hf',
    'jfshfuwDhjk78hfjHUu$',
    '$$$$jfskdjfJKLJLKnveiw4237',
    '2324435323hA!',
    'AAAAAFFFG2!a',
    '$£%!$&*fH2',
    'vbebBIUBfebw23HJ$Hj2',
    'aaaaaa5!A'
];

const invalidPasswords = [
    'abcdefghijkl',
    'aBc!1',
    'ABCDEFGHIJKL',
    '1234567890',
    '$$$$!!!$$$',
    '2324435323A!',
    'AAAAAFFFG!a',
    '$£%!$&*ghj2',
    'vbebfebw23$j2',
    'aaaaaa57c',
    'aastrGWEGW',
    '3756!$%778'
];

it('Given an invalid email address, validation generates error message', () => {
    invalidEmails.forEach(doTest);
    function doTest(value) {
        console.log(value);
        expect(Validation(value, 'email', true)).toBe("Invalid email address");
    }
});

it('Given a valid email address, validation generates a null error message', () => {
    validEmails.forEach(doTest);
    function doTest(value) {
        console.log(value);
        expect(Validation(value, 'email', true)).toBe(null);
    }
});

it('Given a valid password, validation generates a null error message', () => {
    validPasswords.forEach(doTest);
    function doTest(value) {
        console.log(value);
        expect(Validation(value, 'password', true)).toBe(null);
    }
});

it('Given an invalid password, validation generates an error message', () => {
    invalidPasswords.forEach(doTest);
    function doTest(value) {
        console.log(value);
        expect(Validation(value, 'password', true)).toBe('Password must contain upper, lower, digit, special characters');
    }
});