import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { submitLead } from '../services/api';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';
import { 
  ArrowRight, BarChart3, Users, Zap, Shield, 
  CheckCircle2, Star, Target, MessageSquare 
} from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';

const leadSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(50, 'Name cannot exceed 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  budget: z.string().min(1, 'Please select a budget range'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type LeadForm = z.infer<typeof leadSchema>;

export default function LandingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<LeadForm>({
    resolver: zodResolver(leadSchema)
  });

  const onSubmit = async (data: LeadForm) => {
    setIsSubmitting(true);
    try {
      await submitLead(data);
      toast.success('Thank you! Your request has been submitted successfully.');
      reset();
    } catch (error) {
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen font-sans text-gray-900 dark:bg-gray-950 dark:text-gray-100 selection:bg-blue-100 selection:text-blue-900 transition-colors duration-200">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md z-50 border-b border-gray-100 dark:border-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight">LeadDesk</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#features" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hidden sm:block transition-colors">Features</a>
            <a href="#testimonials" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hidden sm:block transition-colors">Testimonials</a>
            <a href="/admin/login" className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Admin Login</a>
            <ThemeToggle />
            <a href="#contact" className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium px-4 py-2 rounded-full transition-colors hidden sm:block">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none"
             style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(255,255,255,0) 70%)' }}></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div {...fadeIn}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6 border border-blue-100">
              <Zap size={16} className="text-blue-500" />
              Supercharge your workflow
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 max-w-4xl mx-auto leading-tight"
          >
            Manage your leads with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">effortless precision.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            LeadDesk Mini helps modern teams capture, organize, and convert prospects faster than ever. Built for speed, designed for growth.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-full font-medium text-lg transition-all shadow-lg shadow-gray-900/20 dark:shadow-none flex items-center justify-center gap-2">
              Start capturing leads <ArrowRight size={20} />
            </a>
            <a href="#features" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-full font-medium text-lg transition-all flex items-center justify-center">
              Explore features
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900/30 px-4 sm:px-6 lg:px-8 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">Everything you need to succeed</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">A unified platform to streamline your sales pipeline and close more deals.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'Smart Tracking', desc: 'Automatically capture and organize lead information in real-time.' },
              { icon: Users, title: 'Team Collaboration', desc: 'Work together seamlessly with shared pipelines and status updates.' },
              { icon: Shield, title: 'Enterprise Security', desc: 'Bank-grade encryption ensures your prospect data remains completely private.' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white">Why top teams choose LeadDesk</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
                We've stripped away the complexity of traditional CRMs to give you exactly what you need: speed, clarity, and results.
              </p>
              <ul className="space-y-4">
                {[
                  'Lightning fast interface with zero bloat',
                  'Real-time status tracking and updates',
                  'Actionable insights at a glance',
                  'Seamless integration with your workflow'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-500 mt-1 shrink-0" size={20} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-100 dark:bg-gray-900/50 rounded-3xl p-8 lg:p-12 border border-gray-200 dark:border-gray-800"
            >
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="h-10 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
                    <div>
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                      <div className="h-3 w-32 bg-gray-100 dark:bg-gray-800 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded"></div>
                    <div className="h-2 w-5/6 bg-gray-100 dark:bg-gray-800 rounded"></div>
                    <div className="h-2 w-4/6 bg-gray-100 dark:bg-gray-800 rounded"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 lg:py-32 bg-gray-900 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">Loved by digital heroes</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Don't just take our word for it.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { quote: "LeadDesk Mini completely transformed how we handle inbound inquiries. The speed is unmatched.", author: "Sarah Jenkins", role: "Sales Director, TechFlow" },
              { quote: "Finally, a tool that doesn't get in the way. It's clean, intuitive, and just works.", author: "Marcus Chen", role: "Founder, Minimal Studio" }
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gray-800 rounded-2xl p-8 border border-gray-700"
              >
                <div className="flex gap-1 mb-6 text-yellow-500">
                  {[1,2,3,4,5].map(star => <Star key={star} size={18} fill="currentColor" />)}
                </div>
                <p className="text-xl font-medium leading-relaxed mb-8">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Lead Form Section */}
      <section id="contact" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-950 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-2 bg-gray-900 text-white p-10 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Let's build something great.</h3>
                  <p className="text-gray-400 mb-8">Fill out the form and our team will get back to you within 24 hours.</p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-gray-300">
                      <MessageSquare size={20} className="text-blue-400" />
                      <span>ritish1808@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-3 p-10 lg:p-12">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <input 
                      {...register('name')}
                      className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border ${errors.name ? 'border-red-300 dark:border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 dark:border-gray-800 focus:ring-blue-500 focus:border-blue-500'} rounded-lg focus:outline-none focus:ring-2 transition-all dark:text-white`}
                      placeholder="Jane Doe"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                    <input 
                      {...register('email')}
                      className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border ${errors.email ? 'border-red-300 dark:border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 dark:border-gray-800 focus:ring-blue-500 focus:border-blue-500'} rounded-lg focus:outline-none focus:ring-2 transition-all dark:text-white`}
                      placeholder="jane@company.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Budget Range</label>
                    <select 
                      {...register('budget')}
                      className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border ${errors.budget ? 'border-red-300 dark:border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 dark:border-gray-800 focus:ring-blue-500 focus:border-blue-500'} rounded-lg focus:outline-none focus:ring-2 transition-all text-gray-700 dark:text-white`}
                    >
                      <option value="">Select a range...</option>
                      <option value="Under ₹10,000">Under ₹10,000</option>
                      <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                      <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                      <option value="₹50,000+">₹50,000+</option>
                    </select>
                    {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                    <textarea 
                      {...register('message')}
                      rows={4}
                      className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border ${errors.message ? 'border-red-300 dark:border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 dark:border-gray-800 focus:ring-blue-500 focus:border-blue-500'} rounded-lg focus:outline-none focus:ring-2 transition-all resize-none dark:text-white`}
                      placeholder="Tell us about your project..."
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      'Submit Request'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-12 px-4 text-center transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
             <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <BarChart3 className="text-white" size={14} />
             </div>
             <span className="font-bold text-gray-900 dark:text-white tracking-tight">LeadDesk Mini</span>
          </div>
          <a 
            href="https://digitalheroesco.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 inline-block transition-colors"
          >
            Built for Digital Heroes Training Task
          </a>
        </div>
      </footer>
    </div>
  );
}
