import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import arrowupIcon from "../assets/weui_arrow-outlinedup.svg";

const CustomerSupport = () => {
  const { section } = useParams();
  const navigate = useNavigate();

  // Decode section name (Replace hyphens with spaces)
  const decodedSection = section ? section.replace(/-/g, " ") : null;

  const [selectedSection, setSelectedSection] = useState(decodedSection);
  const [openSubSection, setOpenSubSection] = useState(null);

  useEffect(() => {
    setSelectedSection(decodedSection);
  }, [decodedSection]);

  // Sidebar items
  const sidebarItems = [
    "Contact us",
    "How to shop",
    "Orders and delivery",
    "Payment and pricing",
    "Returns and refunds",
    "FAQs",
    "Terms and conditions",
    "Privacy policy",
  ];

  // Subsections for each section
  const sectionSubSections = {
    "Contact us": [
      { 
        title: "Customer Support", 
        content: (
          <div>
            <h3 className="font-medium mb-2">Email service hours:</h3>
            <ul className="list-disc pl-5 mb-4">
              <li>Sunday to Friday: 9am to 6pm NPT</li>
              <li>Closed on Saturdays and public holidays</li>
            </ul>
            <p>You can reach our support team at: <span className="font-medium">support@example.com.np</span></p>
          </div>
        ) 
      },
      { 
        title: "Phone Support", 
        content: (
          <div>
            <h3 className="font-medium mb-2">Phone service hours:</h3>
            <ul className="list-disc pl-5 mb-4">
              <li>Sunday to Friday: 10am to 5pm NPT</li>
            </ul>
            <p>Call us at: <span className="font-medium">+977-1-1234567</span> (Kathmandu)</p>
            <p className="mt-2">Toll-free: <span className="font-medium">1660-01-12345</span></p>
          </div>
        ) 
      },
    ],
    "How to shop": [
      { 
        title: "Creating an Account", 
        content: (
          <div>
            <h3 className="font-medium mb-2">Getting started is easy:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Click 'Sign Up' in the top right corner</li>
              <li>Enter your email and create a password</li>
              <li>Verify your mobile number via SMS</li>
              <li>Complete your profile information</li>
            </ol>
            <p className="mt-3">You'll receive <span className="font-medium">Rs. 200 off</span> your first order when you sign up!</p>
          </div>
        ) 
      },
      { 
        title: "Finding Products", 
        content: (
          <div>
            <h3 className="font-medium mb-2">Browse our collection:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Use the search bar for specific items</li>
              <li>Filter by category, price, or location</li>
              <li>Check our 'Dashain Special Offers'</li>
              <li>Save items to your wishlist for later</li>
            </ul>
            <p className="mt-3">Need help? Message us on <span className="font-medium">Viber or WhatsApp</span>!</p>
          </div>
        ) 
      },
    ],
    "Orders and delivery": [
      { 
        title: "Order Processing", 
        content: (
          <div>
            <h3 className="font-medium mb-2">What to expect after ordering:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Order confirmation SMS immediately</li>
              <li>Processing time: 1-2 business days</li>
              <li>Delivery timeframe depends on your location</li>
              <li>Kathmandu Valley: 1-3 days</li>
              <li>Outside Valley: 3-7 days</li>
            </ul>
            <p className="mt-3">Note: Delivery may delay during festivals and road blockades.</p>
          </div>
        ) 
      },
      { 
        title: "Delivery Options", 
        content: (
          <div>
            <h3 className="font-medium mb-2">Available shipping methods:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-medium">Standard:</span> 2-4 business days (Rs. 100)</li>
              <li><span className="font-medium">Express:</span> Next business day (Rs. 200)</li>
              <li><span className="font-medium">Same-Day:</span> Available in Kathmandu (Rs. 300)</li>
            </ul>
            <p className="mt-3">Free standard shipping on orders over <span className="font-medium">Rs. 2,000</span> in Kathmandu Valley!</p>
          </div>
        ) 
      },
    ],
    "Payment and pricing": [
      { 
        title: "Accepted Payment Methods", 
        content: (
          <div>
            <h3 className="font-medium mb-2">We accept:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Cash on Delivery (COD)</li>
              <li>eSewa</li>
              <li>Khalti</li>
              <li>Bank Transfer (Nepali Banks)</li>
              <li>Credit/Debit Cards (Visa, MasterCard)</li>
            </ul>
            <p className="mt-3">All transactions are in Nepalese Rupees.</p>
          </div>
        ) 
      },
      { 
        title: "Currency & Pricing", 
        content: (
          <div>
            <h3 className="font-medium mb-2">Pricing information:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>All prices displayed in Nepalese Rupees (Rs.)</li>
              <li>Inclusive of all taxes (VAT)</li>
              <li>No hidden charges at checkout</li>
              <li>Prices fixed as per Nepal government regulations</li>
            </ul>
            <p className="mt-3">Contact us for wholesale pricing.</p>
          </div>
        ) 
      },
      { 
        title: "Discounts & Coupons", 
        content: (
          <div>
            <h3 className="font-medium mb-2">Ways to save:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Festival season special discounts</li>
              <li>Bank offers (NIC Asia, NMB, Prabhu Bank)</li>
              <li>eSewa/Khalti cashback offers</li>
              <li>Refer friends and get Rs. 150 credit</li>
            </ul>
            <p className="mt-3">Enter promo codes at checkout to apply discounts.</p>
          </div>
        ) 
      },
    ],
    "Returns and refunds": [
      { 
        title: "Returns Policy", 
        content: (
          <div>
            <h3 className="font-medium mb-2">Our return guidelines:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>7-day return window from delivery date</li>
              <li>Items must be unused with original packaging</li>
              <li>Original invoice required</li>
              <li>Electronics have different return policy</li>
            </ul>
            <p className="mt-3">Return shipping charges apply (Rs. 100 within Valley).</p>
          </div>
        ) 
      },
      { 
        title: "How to Return", 
        content: (
          <div>
            <h3 className="font-medium mb-2">Return process:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Call our support number</li>
              <li>Provide order details and return reason</li>
              <li>Wait for pickup confirmation</li>
              <li>Get refund after quality check</li>
            </ol>
            <p className="mt-3">Refunds processed within 3-5 business days to original payment method.</p>
          </div>
        ) 
      },
    ],
    "FAQs": [
      { 
        title: "Common Questions", 
        content: (
          <div>
            <h3 className="font-medium mb-2">Frequently asked:</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Do you deliver to my area?</h4>
                <p className="text-gray-600">We deliver to all major cities in Nepal. Enter your location at checkout to verify.</p>
              </div>
              <div>
                <h4 className="font-medium">What is your COD limit?</h4>
                <p className="text-gray-600">Cash on Delivery available up to Rs. 5,000 per order outside Kathmandu.</p>
              </div>
              <div>
                <h4 className="font-medium">How can I track my order?</h4>
                <p className="text-gray-600">We will SMS you the tracking details with delivery agent contact.</p>
              </div>
            </div>
          </div>
        ) 
      },
      { 
        title: "Troubleshooting", 
        content: (
          <div>
            <h3 className="font-medium mb-2">Problem solving:</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">I didn't receive order confirmation</h4>
                <p className="text-gray-600">Check your SMS inbox. If not received within 15 minutes, please call us.</p>
              </div>
              <div>
                <h4 className="font-medium">Payment failed but amount deducted</h4>
                <p className="text-gray-600">Amount will be auto-refunded in 2-3 working days. Contact your bank if not credited.</p>
              </div>
              <div>
                <h4 className="font-medium">Received wrong/damaged item</h4>
                <p className="text-gray-600">We apologize! Please contact us within 24 hours with photos.</p>
              </div>
            </div>
          </div>
        ) 
      },
    ],
    "Terms and conditions": [
      { 
        title: "Usage Policies", 
        content: (
          <div>
            <h3 className="font-medium mb-2">Website terms:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>By using our site, you agree to these terms</li>
              <li>Content is for personal, non-commercial use only</li>
              <li>You must be 18+ to purchase</li>
              <li>We comply with Nepal government regulations</li>
            </ul>
            <p className="mt-3">As per Nepalese laws.</p>
          </div>
        ) 
      },
      { 
        title: "Legal Agreements", 
        content: (
          <div>
            <h3 className="font-medium mb-2">Important notices:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>All products sold "as is"</li>
              <li>Limitation of liability applies</li>
              <li>Dispute resolution jurisdiction: Kathmandu</li>
              <li>Governing law: Nepal laws</li>
            </ul>
            <p className="mt-3">Consult the full agreement for complete details.</p>
          </div>
        ) 
      },
    ],
    "Privacy policy": [
      { 
        title: "Data Collection", 
        content: (
          <div>
            <h3 className="font-medium mb-2">Information we collect:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Personal information provided during checkout</li>
              <li>Mobile number for verification</li>
              <li>Delivery address details</li>
              <li>Order history for service improvement</li>
            </ul>
            <p className="mt-3">We comply with Nepal's privacy guidelines.</p>
          </div>
        ) 
      },
      { 
        title: "Your Rights", 
        content: (
          <div>
            <h3 className="font-medium mb-2">Your privacy controls:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Right to access your data</li>
              <li>Right to request correction</li>
              <li>Right to opt-out of marketing</li>
              <li>Right to delete account</li>
            </ul>
            <p className="mt-3">Contact our support to exercise these rights.</p>
          </div>
        ) 
      },
    ],
  };

  return (
    <div className="flex flex-col md:flex-row p-8 space-x-10">
      {/* Sidebar */}
      <div className="w-full md:w-1/4">
        <ul className="space-y-3 text-gray-700">
          {sidebarItems.map((item) => (
            <li
              key={item}
              className={`cursor-pointer hover:underline ${
                selectedSection === item ? "font-bold" : ""
              }`}
              onClick={() => navigate(`/${item.replace(/\s+/g, "-")}`)} // Convert spaces to hyphens
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4">
        <h1 className="text-2xl font-semibold mb-6">{selectedSection || "Select a section"}</h1>

        {/* Expandable subsections */}
        {selectedSection && sectionSubSections[selectedSection] ? (
          sectionSubSections[selectedSection].map((subSection, index) => (
            <div key={index} className="border-b py-4">
              <button
                className="flex justify-between items-center w-full text-lg font-medium"
                onClick={() =>
                  setOpenSubSection(openSubSection === index ? null : index)
                }
              >
                {subSection.title}
                <img
                  src={arrowupIcon}
                  alt="arrow"
                  className={`ml-2 w-4 h-4 transform transition-transform ${
                    openSubSection === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {openSubSection === index && (
                <p className="mt-2 text-gray-600">{subSection.content}</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600">Please select a valid section from the sidebar.</p>
        )}
        {/* Feedback Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Tell us what you think</h2>
          <p className="text-gray-600">Was this content helpful?</p>
          <div className="mt-2 space-x-4">
            <button className="px-4 py-2 border rounded-md hover:bg-gray-200">
              Yes
            </button>
            <button className="px-4 py-2 border rounded-md hover:bg-gray-200">
              Not really
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
