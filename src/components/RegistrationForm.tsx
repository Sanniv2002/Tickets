import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, Radio, ArrowRight } from 'lucide-react';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  rollNumber: z.string().min(1, 'Roll number is required'),
  contactNumber: z.string().regex(/^[0-9]{10}$/, 'Invalid phone number'),
  degree: z.string().min(1, 'Please select a degree'),
  year: z.string().min(1, 'Please select a year'),
  yearOther: z.string().optional(),
  branch: z.string().min(1, 'Please select a branch'),
  branchOther: z.string().optional(),
});

function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNumber: '',
    contactNumber: '',
    degree: '',
    year: '',
    yearOther: '',
    branch: '',
    branchOther: '',
  });

  const generateTicketNumber = () => {
    return 'TEDx-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      formSchema.parse(formData);
      const ticketNumber = generateTicketNumber();
      navigate('/ticket', { 
        state: { 
          name: formData.name,
          email: formData.email,
          ticketNumber,
          degree: formData.degree,
          year: formData.year === 'Other' ? formData.yearOther : formData.year,
          branch: formData.branch === 'Other' ? formData.branchOther : formData.branch,
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message, {
            style: {
              background: '#ef4444',
              color: '#fff',
              borderRadius: '10px',
            },
            icon: '⚠️',
          });
        });
      }
    }
  };

  const CustomSelect = ({ 
    value, 
    onChange, 
    options, 
    placeholder 
  }: { 
    value: string; 
    onChange: (value: string) => void; 
    options: string[]; 
    placeholder: string; 
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <div
          className="w-full bg-white/5 rounded-lg border border-gray-600 px-4 py-2.5 flex justify-between items-center cursor-pointer hover:bg-white/10 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={value ? 'text-white' : 'text-gray-400'}>
            {value || placeholder}
          </span>
          <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-xl overflow-hidden"
            >
              {options.map((option) => (
                <motion.div
                  key={option}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      {/* Animated Background */}
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

      {/* Registration Form */}
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Sparkles className="text-red-600" />
            Register for TEDxNITKKR
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-red-400">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/5 rounded-lg border border-gray-600 px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-white/5 rounded-lg border border-gray-600 px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-red-400">Academic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Roll Number (NA for non-NIT)</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/5 rounded-lg border border-gray-600 px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    value={formData.rollNumber}
                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Number</label>
                  <input
                    type="tel"
                    required
                    className="w-full bg-white/5 rounded-lg border border-gray-600 px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Degree</label>
                  <div className="flex gap-4">
                    {['BTech', 'MCA/MTech'].map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer group">
                        <div
                          className="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors group-hover:border-red-500"
                          onClick={() => setFormData({ ...formData, degree: option })}
                        >
                          <motion.div
                            initial={false}
                            animate={{
                              scale: formData.degree === option ? 1 : 0,
                              backgroundColor: formData.degree === option ? '#dc2626' : '#transparent'
                            }}
                            className="w-2 h-2 rounded-full"
                          />
                        </div>
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Year</label>
                  <CustomSelect
                    value={formData.year}
                    onChange={(value) => setFormData({ ...formData, year: value })}
                    options={['1st', '2nd', '3rd', '4th', 'Other']}
                    placeholder="Select Year"
                  />
                  <AnimatePresence>
                    {formData.year === 'Other' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <input
                          type="text"
                          placeholder="Specify your year"
                          className="mt-2 w-full bg-white/5 rounded-lg border border-gray-600 px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                          value={formData.yearOther}
                          onChange={(e) => setFormData({ ...formData, yearOther: e.target.value })}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Branch</label>
                  <CustomSelect
                    value={formData.branch}
                    onChange={(value) => setFormData({ ...formData, branch: value })}
                    options={['Electrical', 'Civil', 'AI/ML', 'MNC', 'MBA', 'MCA', 'ECE', 'Other']}
                    placeholder="Select Branch"
                  />
                  <AnimatePresence>
                    {formData.branch === 'Other' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <input
                          type="text"
                          placeholder="Specify your branch"
                          className="mt-2 w-full bg-white/5 rounded-lg border border-gray-600 px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                          value={formData.branchOther}
                          onChange={(e) => setFormData({ ...formData, branchOther: e.target.value })}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-red-400">Payment Details</h3>
              <div className="bg-white/5 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-gray-300">Ticket Price</p>
                    <p className="text-2xl font-bold">₹100</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/2560px-UPI-Logo-vector.svg.png"
                      alt="UPI"
                      className="h-8 opacity-50 hover:opacity-100 transition-opacity"
                    />
                    <Radio className="text-red-600" />
                  </div>
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  Proceed to Payment
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegistrationForm;