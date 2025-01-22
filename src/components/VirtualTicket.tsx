import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, ArrowLeft, Sparkles } from 'lucide-react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { TicketData } from '../App';

// Mock payment details (in real app, this would come from Paytm API)
const paymentDetails = {
  transactionId: "PTM" + Math.random().toString(36).substring(2, 10).toUpperCase(),
  paymentMethod: "UPI/Paytm",
  timestamp: new Date().toLocaleString(),
};

// PDF styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#fff',
  },
  ticketContainer: {
    border: 2,
    borderColor: '#ff2b2b',
    borderRadius: 8,
    padding: 30,
    height: '100%',
    position: 'relative',
  },
  header: {
    marginBottom: 40,
    borderBottom: 1,
    borderBottomColor: '#ff2b2b',
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    color: '#ff2b2b',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  content: {
    marginBottom: 30,
  },
  ticketNumber: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Courier',
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginBottom: 30,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#000',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  col: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    borderTop: 1,
    borderTopColor: '#ff2b2b',
    paddingTop: 20,
  },
  price: {
    fontSize: 24,
    color: '#ff2b2b',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  eventDate: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  // Payment page styles
  paymentContainer: {
    padding: 40,
    backgroundColor: '#f5f5f5',
    height: '100%',
  },
  paymentHeader: {
    fontSize: 24,
    color: '#ff2b2b',
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: 'bold',
  },
  paymentBox: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 8,
    border: 1,
    borderColor: '#ff2b2b',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottom: 1,
    borderBottomColor: '#eee',
  },
  paymentLabel: {
    fontSize: 14,
    color: '#666',
  },
  paymentValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  successBadge: {
    backgroundColor: '#dcfce7',
    color: '#166534',
    padding: '10 20',
    borderRadius: 4,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 30,
  }
});

// PDF Document Component
const TicketPDF = ({ data }: { data: TicketData }) => (
  <Document>
    {/* Ticket Page */}
    <Page size="A4" style={styles.page}>
      <View style={styles.ticketContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>TEDxNITKKR</Text>
          <Text style={styles.subtitle}>Virtual Ticket</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.ticketNumber}>{data.ticketNumber}</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Attendee</Text>
            <Text style={styles.value}>{data.name}</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Degree</Text>
              <Text style={styles.value}>{data.degree}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Year</Text>
              <Text style={styles.value}>{data.year}</Text>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Branch</Text>
            <Text style={styles.value}>{data.branch}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Event Date</Text>
            <Text style={styles.value}>March 30, 2024</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.price}>₹100</Text>
          <Text style={styles.eventDate}>Join us for an inspiring experience!</Text>
        </View>
      </View>
    </Page>

    {/* Payment Details Page */}
    <Page size="A4" style={styles.page}>
      <View style={styles.paymentContainer}>
        <Text style={styles.paymentHeader}>Payment Receipt</Text>
        
        <View style={styles.paymentBox}>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Transaction ID</Text>
            <Text style={styles.paymentValue}>{paymentDetails.transactionId}</Text>
          </View>

          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Payment Method</Text>
            <Text style={styles.paymentValue}>{paymentDetails.paymentMethod}</Text>
          </View>

          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Amount</Text>
            <Text style={styles.paymentValue}>₹100</Text>
          </View>

          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Date & Time</Text>
            <Text style={styles.paymentValue}>{paymentDetails.timestamp}</Text>
          </View>

          <Text style={styles.successBadge}>Payment Successful ✓</Text>
        </View>
      </View>
    </Page>
  </Document>
);

function VirtualTicket() {
  const location = useLocation();
  const navigate = useNavigate();
  const ticketData = location.state as TicketData;

  if (!ticketData) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
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

      <div className="fixed top-4 left-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-white/80 hover:text-white"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Registration
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-red-900/50 to-black p-8 rounded-2xl shadow-2xl max-w-md w-full space-y-6 relative overflow-hidden backdrop-blur-lg border border-red-900/20"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,0,0,0.5),transparent)]" />
        </div>

        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="text-red-500 w-6 h-6" />
              <div>
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-300">
                  TEDxNITKKR
                </h3>
                <p className="text-red-400 text-sm">Virtual Ticket</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 p-4 rounded-lg backdrop-blur-sm border border-white/10"
            >
              <p className="text-gray-400 text-sm">Ticket Number</p>
              <p className="font-mono text-xl font-bold">{ticketData.ticketNumber}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 p-4 rounded-lg backdrop-blur-sm border border-white/10"
            >
              <p className="text-gray-400 text-sm">Attendee</p>
              <p className="text-xl font-medium">{ticketData.name}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                <p className="text-gray-400 text-sm">Degree</p>
                <p className="font-medium">{ticketData.degree}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                <p className="text-gray-400 text-sm">Year</p>
                <p className="font-medium">{ticketData.year}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 p-4 rounded-lg backdrop-blur-sm border border-white/10"
            >
              <p className="text-gray-400 text-sm">Branch</p>
              <p className="font-medium">{ticketData.branch}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 p-4 rounded-lg backdrop-blur-sm border border-white/10"
            >
              <p className="text-gray-400 text-sm">Event Date</p>
              <p className="font-medium">March 30, 2024</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 pt-6 border-t border-red-900/30"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">Amount Paid</p>
                <p className="text-2xl font-bold">₹100</p>
              </div>
              <PDFDownloadLink
                document={<TicketPDF data={ticketData} />}
                fileName={`TEDxNITKKR-Ticket-${ticketData.ticketNumber}.pdf`}
              >
                {({ loading }) => (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                    disabled={loading}
                  >
                    <Download className="w-5 h-5" />
                    {loading ? 'Loading...' : 'Download Ticket'}
                  </motion.button>
                )}
              </PDFDownloadLink>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default VirtualTicket;