import React, { useState } from 'react';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! 👋 I\'m here to help. Ask me anything about ProjectHub!' }
  ]);
  const [input, setInput] = useState('');

  const faqData = {
    // ACCOUNT & LOGIN
    'create account': 'Click "Sign Up" on the homepage, fill in your name, email, phone, college, and branch details. You\'ll be registered as a student instantly!',
    'log in': 'Click "Login" button and enter your registered email and password. If you\'re an admin, use your admin credentials.',
    'forgot password': 'Please contact our support team at projecthub.helpdesk@gmail.com with your registered email to reset your password.',
    'change email': 'Go to your Profile section after logging in. You can update your email, phone number, and other details there.',
    'delete account': 'Contact us at projecthub.helpdesk@gmail.com to request account deletion. We\'ll process it within 24-48 hours.',
    'account safe': 'Yes! We use secure authentication, encrypted connections, and follow industry-standard security practices to protect your data.',

    // PROJECT POSTING
    'post project': 'After logging in, go to "My Projects" → "Post New Project". Select your project type (Mini/Major/Prototype/Documentation), fill in the details, and submit!',
    'project details': 'You need: Project Title, Type (Mini/Major/Prototype/Documentation), Description/Requirements, Budget, Deadline, and any specific technologies or formats needed.',
    'edit project': 'Yes! You can edit your project while it\'s in "Open" or "In Review" status. Click on the project and select "Edit Project".',
    'how many projects': 'There\'s no limit! You can submit as many projects as you need. Each project is tracked separately in your dashboard.',
    'project types': 'Mini Project (3-7 days), Major Project (10-15 days), Prototype (MVP/UI demo, 5-10 days), Documentation (Reports/PPT/SRS, 2-5 days).',
    'file formats': 'You can upload documents, images, PDFs, and reference files. Common formats: .pdf, .doc, .docx, .jpg, .png, .zip',
    'file size': 'File upload limits depend on your requirements. For large files, you can share Google Drive or Dropbox links in the description.',

    // PROJECT STATUS
    'check status': 'Go to "My Projects" dashboard. You\'ll see real-time status: Open, In Review, In Progress, Delivered, or Completed with color-coded badges.',
    'in review': '"In Review" means our admin team is reviewing your requirements and will start development soon.',
    'in progress': '"In Progress" means your project is actively being developed. You can track progress updates in real-time!',
    'delivered': '"Delivered" means your project is complete and ready. However, source code download may be locked until admin approval.',
    'completed': '"Completed" means everything is done and the source code download is unlocked. You can download all files!',
    'how long': 'Mini: 3-7 days, Major: 10-15 days, Prototype: 5-10 days, Documentation: 2-5 days. Exact timeline depends on complexity.',
    'real-time updates': 'Yes! Check your project details page for progress updates. You\'ll also receive notifications for status changes.',

    // PAYMENT & TRUST
    'pay advance': 'Payment terms are discussed with admin. Typically, partial advance is required to start, with balance on delivery.',
    'trust developer': 'We provide progress updates, verified delivery proof gallery, and 150+ successful projects. Check our testimonials!',
    'developer trust': 'We use a secure platform with verified users. Payment is released only after you confirm satisfaction with the delivery.',
    'get source code': 'Source code is provided after project completion. Download link appears in your project details page.',
    'full payment': 'Yes, source code download is locked by default. Admin unlocks it after payment verification to protect both parties.',
    'refunds': 'Refunds are not guaranteed once development starts. However, we offer free revisions to ensure your satisfaction.',

    // SOURCE CODE & DELIVERY
    'code locked': 'Source code is locked by default for security. Admin unlocks it after verifying payment and requirements are met.',
    'code unlocked': 'Admin unlocks the download after payment verification. You\'ll receive a notification when it\'s ready to download.',
    'download files': 'Go to your project details page. If status is "Completed" and download is unlocked, click "Download Source Code" button.',
    'what files': 'You receive: Complete source code, documentation, project report, PPT presentation, setup instructions, and any requested deliverables.',
    'documentation ppt': 'Yes! All projects include documentation. Major projects get full reports and PPT. Documentation projects get comprehensive academic reports.',
    'code reusable': 'Yes! The source code is yours for academic and personal use. You can modify and use it for your submissions.',
    'changes after delivery': 'Yes! Request revisions through the platform. We offer free revisions to ensure the project meets your requirements.',

    // REVISION & CHANGES
    'request revision': 'Contact admin through the platform or email projecthub.helpdesk@gmail.com with your revision requirements.',
    'how many revisions': 'We offer reasonable free revisions to meet your original requirements. Major scope changes may require discussion.',
    'revisions cost': 'Free revisions for original requirements. Significant new features or scope changes may have additional costs.',
    'change features': 'Minor changes are accommodated. Major feature changes should be discussed with admin as they may affect timeline and cost.',
    'changes after completion': 'Yes, you can request revisions even after completion. We want to ensure you\'re completely satisfied!',

    // PROTOTYPE & DOCUMENTATION
    'what is prototype': 'A prototype is a working demo/MVP of your idea. It includes UI mockups, clickable demos, or basic functional versions.',
    'prototype includes': 'UI/UX designs, wireframes, clickable prototypes (Figma/HTML), basic functionality demo, and user flow documentation.',
    'documentation service': 'Complete project reports (Chapters 1-6), IEEE format, PPT, Abstract, Synopsis, SRS, Test Cases, Research papers, Internship reports.',
    'college format': 'Yes! We follow your specific college/university format. Just provide the format guidelines or sample when submitting.',
    'plagiarism free': 'Absolutely! We guarantee plagiarism-free content. You can specify your required plagiarism limit (0-5%, 5-10%, etc.).',
    'ppt documentation': 'Yes! Documentation projects include PPT presentations along with the complete report in your required format.',

    // SUPPORT & COMMUNICATION
    'contact admin': 'Email: projecthub.helpdesk@gmail.com. You can also use the notification system within the platform.',
    'chat support': 'Currently, support is via email. We respond quickly to all queries at projecthub.helpdesk@gmail.com',
    'support hours': 'We monitor emails 24/7 and respond within a few hours. For urgent queries, mention "URGENT" in the subject.',
    'whatsapp': 'Primary contact is email: projecthub.helpdesk@gmail.com. WhatsApp support may be provided for active projects.',
    'reply time': 'We typically respond within 2-6 hours during business hours, and within 24 hours on weekends.',

    // SECURITY & PRIVACY
    'data secure': 'Yes! We use encrypted connections, secure authentication, and follow strict data protection practices. Your data is safe.',
    'idea confidential': 'Absolutely! We maintain strict confidentiality. Your project ideas and details are never shared with anyone.',
    'project shared': 'No! Your project is private and confidential. Only you and the admin team can access your project details.',
    'who sees files': 'Only you and the admin team working on your project can see your files. We never share them with third parties.',
    'data marketing': 'No! We don\'t use your personal data for marketing. We only use it to provide services and communicate project updates.',

    // GENERAL
    'who can use': 'ProjectHub is designed for college students, engineering students, final year project groups, internship seekers, and startup idea holders.',
    'free to use': 'Registration is free! You only pay for the projects you submit. Pricing depends on project type and complexity.',
    'all colleges': 'Yes! ProjectHub works with students from all colleges and universities across India and internationally.',
    'startups use': 'Yes! Startups can use ProjectHub for prototypes, MVPs, and initial development. Contact us for custom requirements.',
    'internships': 'Currently, we focus on project delivery. For internship opportunities, email projecthub.helpdesk@gmail.com',
    'certificates': 'We provide project completion certificates upon request. Mention this requirement when submitting your project.',
    'officially registered': 'ProjectHub is a professional service platform. For business inquiries, contact projecthub.helpdesk@gmail.com',
    'give feedback': 'We love feedback! Email us at projecthub.helpdesk@gmail.com or leave a review after project completion.',

    // Additional helpful responses
    'pricing': 'Pricing varies by project type and complexity. Submit your project requirements to get a quote. We offer student-friendly rates!',
    'technologies': 'We work with: React, Node.js, Python, Java, Flutter, React Native, Machine Learning, AI, Blockchain, and more!',
    'guarantee': 'We guarantee quality work, on-time delivery, plagiarism-free content, and free revisions. Your satisfaction is our priority!',
    'track progress': 'Yes! Login to your dashboard → My Projects → Click on your project to see real-time progress updates and status.',
  };

  const findAnswer = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    // Find matching FAQ
    for (const [key, answer] of Object.entries(faqData)) {
      if (lowerQuestion.includes(key)) {
        return answer;
      }
    }

    // Default response
    return 'I\'m not sure about that. Please contact our support team at projecthub.helpdesk@gmail.com for detailed assistance. You can also check our FAQ section on the homepage!';
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    // Get bot response
    setTimeout(() => {
      const botResponse = { type: 'bot', text: findAnswer(input) };
      setMessages(prev => [...prev, botResponse]);
    }, 500);

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickQuestions = [
    'How do I post a project?',
    'What are project types?',
    'How long does it take?',
    'Is source code locked?',
    'How do I contact support?'
  ];

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #5DADE2 0%, #48C9B0 100%)',
            border: 'none',
            boxShadow: '0 4px 20px rgba(93, 173, 226, 0.4)',
            cursor: 'pointer',
            fontSize: '1.8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '380px',
          maxWidth: '90vw',
          height: '600px',
          maxHeight: '80vh',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #5DADE2 0%, #48C9B0 100%)',
            color: 'white',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>💬 ProjectHub Assistant</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Ask me anything!</div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: 'white',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            background: '#f8f9fa'
          }}>
            {messages.map((msg, index) => (
              <div key={index} style={{
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{
                  maxWidth: '80%',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  background: msg.type === 'user' ? '#5DADE2' : 'white',
                  color: msg.type === 'user' ? 'white' : '#2C3E50',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  fontSize: '0.95rem',
                  lineHeight: '1.5'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div style={{
              padding: '0.5rem 1rem',
              background: 'white',
              borderTop: '1px solid #e0e0e0'
            }}>
              <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>Quick questions:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInput(q);
                      setTimeout(() => handleSend(), 100);
                    }}
                    style={{
                      background: '#f0f0f0',
                      border: 'none',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      textAlign: 'left',
                      color: '#2C3E50'
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '1rem',
            background: 'white',
            borderTop: '1px solid #e0e0e0',
            display: 'flex',
            gap: '0.5rem'
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              style={{
                flex: 1,
                padding: '0.75rem',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
            <button
              onClick={handleSend}
              style={{
                background: 'linear-gradient(135deg, #5DADE2 0%, #48C9B0 100%)',
                border: 'none',
                color: 'white',
                padding: '0.75rem 1.25rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
