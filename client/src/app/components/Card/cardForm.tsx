"use client"
import { DatePicker } from '@mui/x-date-pickers';
import React, { useState } from 'react';

const CardForm = () => {
    const [cardType, setCardType] = useState('');
    const detectCardType = (number: any) => {
        const cleanedNumber = number.replace(/\D/g, ''); // Remove non-digit characters
        const firstDigit = cleanedNumber[0];
        const firstTwoDigits = cleanedNumber.slice(0, 2);

        if (firstDigit === '4') {
            return 'Visa';
        } else if (firstTwoDigits >= '51' && firstTwoDigits <= '55') {
            return 'MasterCard';
        }
        // Add more conditions for other card types
        return 'Unknown';
    };
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cvv: '',
        expirationDate: '',
        cardholderName: ''
    });
    const formatExpirationDate = (value: any) => {
        // Automatically inserts a slash after MM (2 digits)
        if (value.length === 4 && !value.includes('/')) {
            return value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        return value;
    };
    const formatCardNumber = (value: any) => {
        // Remove all non-digit characters
        let cleaned = value.replace(/\D/g, '');

        // Truncate to the first 12 digits if necessary
        cleaned = cleaned.substring(0, 16);
        const type = detectCardType(cleaned);
        setCardType(type);
        // Add a space after every 4 digits
        return cleaned.replace(/(.{4})/g, '$1 ').trim();
    };
    const handleChange = (e: any) => {
        const { name, value } = e.target;

        if (name === 'cvv' && value.length > 3) {
            return; // Prevents entering more than 3 characters
        }

        let formattedValue = value;
        if (name === 'cardNumber') {
            formattedValue = formatCardNumber(value);
        } else if (name === 'expirationDate') {
            if (!/^([0-9]{0,2})\/?([0-9]{0,2})$/.test(value)) {
                return; // Allows only MM/YY format
            }
            formattedValue = formatExpirationDate(value);
        }

        setCardDetails({ ...cardDetails, [name]: formattedValue });
    }

    const isLuhnValid = (number: any) => {
        let sum = 0;
        let shouldDouble = false;
        for (let i = number.length - 1; i >= 0; i--) {
            let digit = parseInt(number.charAt(i), 10);

            if (shouldDouble) {
                if ((digit *= 2) > 9) digit -= 9;
            }

            sum += digit;
            shouldDouble = !shouldDouble;
        }

        return sum % 10 === 0;
    };

    const validateCardNumber = (number: any) => {
        return number.length >= 13 && number.length <= 19 && isLuhnValid(number);
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!validateCardNumber(cardDetails.cardNumber)) {
            alert('Invalid card number');
            return;
        }
        console.log('Submitting', cardDetails);
    }

    return (
        <div className="relative flex flex-col justify-center overflow-hidden h-screen">
            <div className="w-full p-6 mx-auto my-10 rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
                <form onSubmit={handleSubmit} className="form-control w-full max-w-xs">
                    <div className="flex items-center">
                        <label className="label">
                            <span className="label-text">Card Number</span>
                        </label>
                        <input
                            type="text"
                            name="cardNumber"
                            value={cardDetails.cardNumber}
                            onChange={handleChange}
                            className="input input-bordered w-full max-w-xs"
                        />
                        {cardType === 'Visa' && <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                            <path fill="#1565C0" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"></path><path fill="#FFF" d="M15.186 19l-2.626 7.832c0 0-.667-3.313-.733-3.729-1.495-3.411-3.701-3.221-3.701-3.221L10.726 30v-.002h3.161L18.258 19H15.186zM17.689 30L20.56 30 22.296 19 19.389 19zM38.008 19h-3.021l-4.71 11h2.852l.588-1.571h3.596L37.619 30h2.613L38.008 19zM34.513 26.328l1.563-4.157.818 4.157H34.513zM26.369 22.206c0-.606.498-1.057 1.926-1.057.928 0 1.991.674 1.991.674l.466-2.309c0 0-1.358-.515-2.691-.515-3.019 0-4.576 1.444-4.576 3.272 0 3.306 3.979 2.853 3.979 4.551 0 .291-.231.964-1.888.964-1.662 0-2.759-.609-2.759-.609l-.495 2.216c0 0 1.063.606 3.117.606 2.059 0 4.915-1.54 4.915-3.752C30.354 23.586 26.369 23.394 26.369 22.206z"></path><path fill="#FFC107" d="M12.212,24.945l-0.966-4.748c0,0-0.437-1.029-1.573-1.029c-1.136,0-4.44,0-4.44,0S10.894,20.84,12.212,24.945z"></path>
                        </svg>}
                        {cardType === 'MasterCard' && <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                            <path fill="#3F51B5" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"></path><path fill="#FFC107" d="M30 14A10 10 0 1 0 30 34A10 10 0 1 0 30 14Z"></path><path fill="#FF3D00" d="M22.014,30c-0.464-0.617-0.863-1.284-1.176-2h5.325c0.278-0.636,0.496-1.304,0.637-2h-6.598C20.07,25.354,20,24.686,20,24h7c0-0.686-0.07-1.354-0.201-2h-6.598c0.142-0.696,0.359-1.364,0.637-2h5.325c-0.313-0.716-0.711-1.383-1.176-2h-2.973c0.437-0.58,0.93-1.122,1.481-1.595C21.747,14.909,19.481,14,17,14c-5.523,0-10,4.477-10,10s4.477,10,10,10c3.269,0,6.162-1.575,7.986-4H22.014z"></path>
                        </svg>}
                    </div>
                    <label className="label">
                        <span className="label-text">CVV</span>
                    </label>
                    <input
                        type="password"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleChange}
                        className="input input-bordered w-full max-w-xs"
                    />

                    <label className="label">
                        <span className="label-text">Expiration Date (DD/MM)</span>
                    </label>
                    <input
                        type="Date"
                        name="expirationDate"
                        value={cardDetails.expirationDate}
                        onChange={handleChange}
                        placeholder="DD/MM"
                        className="input input-bordered w-full max-w-xs"
                    />
                    {/* <DatePicker label={'"month" and "year"'} views={['month', 'year']}
                        name="expirationDate"
                        value={cardDetails.expirationDate}
                        onChange={handleChange}
                        placeholder="DD/MM" /> */}
                    <label className="label">
                        <span className="label-text">Cardholder Name</span>
                    </label>
                    <input
                        type="text"
                        name="cardholderName"
                        value={cardDetails.cardholderName}
                        onChange={handleChange}
                        className="input input-bordered w-full max-w-xs"
                    />

                    <button type="submit" className="btn btn-primary mt-4">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CardForm;
