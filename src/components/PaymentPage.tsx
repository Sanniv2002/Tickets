import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

export function PaymentPage() {
    const [paymentProof, setPaymentProof] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [_, setShowTicket] = useState(false);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
                setPaymentProof(file);
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setPreviewUrl(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                } else {
                    setPreviewUrl('');
                }
            } else {
                alert('Please upload only PDF or image files');
                e.target.value = '';
            }
        }
    };

    const handlePaymentVerification = (e: React.FormEvent) => {
        e.preventDefault();
        if (!paymentProof) {
            alert('Please upload payment proof');
            return;
        }
        setShowTicket(true);
    };

    return (
        <>
            <div className="fixed inset-0">
                <motion.div
                    className="absolute inset-0 opacity-20"
                    animate={{
                        background: [
                            'radial-gradient(circle at 0% 0%, #ff0000 0%, transparent 50%)',
                            'radial-gradient(circle at 100% 100%, #ff0000 0%, transparent 50%)',
                            'radial-gradient(circle at 0% 100%, #ff0000 0%, transparent 50%)',
                            'radial-gradient(circle at 100% 0%, #ff0000 0%, transparent 50%)',
                        ]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
            </div>
            <div className='min-h-screen flex items-center justify-center px-4 py-16'>
                <div className='w-full sm:w-1/4 max-w-3xl bg-white/10 backdrop-blur-lg rounded-2xl p-8'>
                    <h1 className="text-3xl font-bold mb-8 text-center">Payment Details</h1>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg flex items-center justify-center">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                                alt="Payment QR Code"
                                className="w-48 h-48"
                            />
                        </div>

                        <div className="text-center space-y-2">
                            <p className="text-lg font-semibold">UPI ID: tedx@okaxis</p>
                            <p className="text-sm text-gray-400">Scan QR code or use UPI ID to pay ₹100</p>
                        </div>

                        <div className="border-t border-gray-800 pt-6">
                            <label className="block text-sm font-medium mb-4">Upload Payment Proof</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    onChange={handleFileUpload}
                                    accept="image/*,application/pdf"
                                    className="hidden"
                                    id="payment-proof"
                                />
                                <label
                                    htmlFor="payment-proof"
                                    className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-red-500 transition-colors"
                                >
                                    <div className="text-center">
                                        <Upload className="mx-auto h-8 w-8 mb-2 text-gray-400" />
                                        <p className="text-sm text-gray-400">
                                            {paymentProof ? paymentProof.name : 'Click to upload payment proof'}
                                        </p>
                                    </div>
                                </label>
                            </div>

                            {previewUrl && (
                                <div className="mt-4">
                                    <img src={previewUrl} alt="Payment proof preview" className="max-h-48 mx-auto rounded-lg" />
                                </div>
                            )}

                            {paymentProof?.type === 'application/pdf' && (
                                <p className="mt-2 text-sm text-center text-gray-400">PDF file selected: {paymentProof.name}</p>
                            )}
                        </div>

                        <button
                            onClick={handlePaymentVerification}
                            disabled={!paymentProof}
                            className={`w-full py-3 rounded-lg font-semibold transition-colors ${paymentProof
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'bg-gray-600 cursor-not-allowed text-gray-300'
                                }`}
                        >
                            Verify Payment & Generate Ticket
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
