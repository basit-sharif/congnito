"use client"
import { updateUserAttributes } from "aws-amplify/auth";
import { useEffect, useState } from "react";


async function handleUpdateEmailAndNameAttributes(
    updatedGender: string,
    updatedProfilePicture: string,
    address: string,
    givenName: string,
    phoneNumber: string,
) {
    try {
        const attributes = await updateUserAttributes({
            userAttributes: {
                gender: updatedGender,
                picture: updatedProfilePicture,
                address: address,
                given_name: givenName,
                phone_number: phoneNumber
            }
        });
        console.log("attributes", attributes);
        return "DONE"
    } catch (error) {
        console.log(error);
        return "Error"
    }
}

const Profile = () => {
    const [fullName, setFullName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const handleProfileInformation = async (e: any) => {
        e.preventDefault();
        const res = await handleUpdateEmailAndNameAttributes(gender, imageUrl, address, fullName, phoneNumber);
        console.log("Res", res);
        // setStep(3); // Go back to the signup step
    };



    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
            <form onSubmit={handleProfileInformation} >
                <label className="block mb-4">
                    <span className="text-gray-700">Full Name:</span>
                    <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">Image URL:</span>
                    <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">Gender:</span>
                    <div className="mt-2">
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="radio"
                                value="male"
                                checked={gender === 'male'}
                                onChange={() => setGender('male')}
                                className="form-radio"
                            />
                            <span className="ml-2">Male</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                value="female"
                                checked={gender === 'female'}
                                onChange={() => setGender('female')}
                                className="form-radio"
                            />
                            <span className="ml-2">Female</span>
                        </label>
                    </div>
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">Phone Number:</span>
                    <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">Address:</span>
                    <textarea
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                {/* Add a button for submitting profile information */}
                <button
                    type="submit"
                    className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
                >
                    Save Profile Information
                </button>
            </form>
        </div>
    )
}

export default Profile