import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import LoadingOverlay from './LoadingOverlay';

const BASE_URL = import.meta.env.VITE_PUBLIC_BASE_URL || ''

type OfferData = {
    _id: { $oid: string };
    offer: string;
    active: boolean;
    price: string;
  };
  

export function PaymentPage() {
    const [paymentProof, setPaymentProof] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>('');
    const [isLoading, setIsLoading] = useState(false);
    const [offerData, setOfferData] = useState<OfferData | null>(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchOffer = async () => {
          try {
            const response = await axios.get(`${BASE_URL}/api/v1/offers/current`);
            setOfferData(response.data);
          } catch (error) {
            console.error('Failed to fetch offer:', error);
            toast.error('Failed to fetch ticket price', {
              style: {
                background: '#ef4444',
                color: '#fff',
                borderRadius: '10px',
              },
              icon: '⚠️',
            });
          }
        };
        fetchOffer();
      }, []);

    // Extracting query params (e.g., `id`)
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('ref');

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
                setPaymentProof(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewUrl(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please upload only PDF or image files');
                e.target.value = '';
            }
        }
    };

    const handleRemoveFile = () => {
        setPaymentProof(null);
        setPreviewUrl(null);
    };

    const handlePaymentVerification = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!paymentProof) {
            alert('Please upload payment proof');
            return;
        }

        if (!id) {
            alert('Payment ID is missing');
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        const _id = localStorage.getItem('current-id')
        formData.append('id', id);
        formData.append('file', paymentProof);

        try {
            if (id !== _id) {
                toast.error("Validation Error", {
                    style: {
                        background: '#ef4444',
                        color: '#fff',
                        borderRadius: '10px',
                    },
                    icon: '⚠️',
                });
            }
            const response = await axios.post(`${BASE_URL}/api/v1/finalize`, formData)

            if (response.status) {
                localStorage.removeItem('current-id');
                localStorage.removeItem('user-state')
                navigate('/success');
            } else {
                throw new Error('Payment verification failed');
            }
        } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment verification failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {isLoading && <LoadingOverlay />}
            </AnimatePresence>
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
            <div className="min-h-screen flex items-center justify-center px-4 py-16">
                <div className="w-full sm:w-1/4 max-w-3xl bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                    <h1 className="text-3xl font-bold mb-8 text-center">Payment Details</h1>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg flex items-center justify-center">
                            <img
                                src="./image.png"
                                alt="Payment QR Code"
                                className=""
                            />
                        </div>

                        <div className="text-center space-y-2">
                            <p className="text-lg font-semibold">UPI ID: 9382655006@ptsbi</p>
                            <p className="text-sm text-gray-400">Scan QR code or use UPI ID to pay ₹{offerData?.price}</p>
                            {/* <p className="text-sm text-gray-400">Contact 9382655006 for any discrepancy</p> */}
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

                            {(previewUrl || paymentProof?.type === 'application/pdf') && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 relative"
                                >
                                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 relative">
                                        <button
                                            onClick={handleRemoveFile}
                                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>

                                        {previewUrl ? (
                                            <div className="relative w-full aspect-video flex items-center justify-center overflow-hidden rounded-lg bg-black/20">
                                                <img
                                                    src={previewUrl}
                                                    alt="Payment proof preview"
                                                    className="max-w-full max-h-full object-contain"
                                                />
                                            </div>
                                        ) : (
                                            <div className="bg-gray-800/50 rounded-lg p-4 flex items-center gap-3">
                                                <div className="p-2 bg-red-600/20 rounded-lg">
                                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1 truncate">
                                                    <p className="text-sm font-medium text-white truncate">
                                                        {paymentProof?.name}
                                                    </p>
                                                    <p className="text-xs text-gray-400">PDF Document</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                        </div>

                        <button
                            onClick={handlePaymentVerification}
                            disabled={!paymentProof || isLoading}
                            className={`w-full py-3 rounded-lg font-semibold transition-colors ${paymentProof
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'bg-gray-600 cursor-not-allowed text-gray-300'
                                }`}
                        >
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}