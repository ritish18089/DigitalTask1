import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLeads, searchLeads, updateLeadStatus, deleteLead } from '../services/api';
import { Lead, LeadStatus } from '../types';
import toast from 'react-hot-toast';
import { 
  Users, UserPlus, CheckCircle2, UserCheck, 
  LogOut, Search, Trash2, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    loadLeads();
  }, [token, navigate]);

  const loadLeads = async () => {
    try {
      setIsLoading(true);
      const data = await fetchLeads(token!);
      setLeads(data);
    } catch (error) {
      toast.error('Failed to load leads');
      if ((error as any).response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      setIsLoading(true);
      if (searchQuery.trim()) {
        const data = await searchLeads(token, searchQuery);
        setLeads(data);
      } else {
        await loadLeads();
      }
    } catch (error) {
      toast.error('Search failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: LeadStatus) => {
    try {
      await updateLeadStatus(token!, id, newStatus);
      setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
      toast.success('Status updated');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await deleteLead(token!, id);
      setLeads(leads.filter(l => l.id !== id));
      toast.success('Lead deleted');
    } catch (error) {
      toast.error('Failed to delete lead');
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const stats = useMemo(() => {
    return {
      total: leads.length,
      new: leads.filter(l => l.status === 'NEW').length,
      contacted: leads.filter(l => l.status === 'CONTACTED').length,
      closed: leads.filter(l => l.status === 'CLOSED').length,
    };
  }, [leads]);

  const columnHelper = createColumnHelper<Lead>();
  
  const columns = useMemo(() => [
    columnHelper.accessor('id', { header: 'ID', cell: info => <span className="text-gray-500 font-medium">#{info.getValue()}</span> }),
    columnHelper.accessor('name', { header: 'Name', cell: info => <span className="font-semibold">{info.getValue()}</span> }),
    columnHelper.accessor('email', { header: 'Email' }),
    columnHelper.accessor('budget', { header: 'Budget' }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => {
        const status = info.getValue();
        return (
          <select
            value={status}
            onChange={(e) => handleStatusChange(info.row.original.id, e.target.value as LeadStatus)}
            className={`text-sm rounded-full px-3 py-1 font-medium border outline-none dark:bg-gray-800
              ${status === 'NEW' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800' : 
                status === 'CONTACTED' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800' : 
                'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800'}
            `}
          >
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="CLOSED">Closed</option>
          </select>
        );
      }
    }),
    columnHelper.accessor('createdAt', {
      header: 'Date',
      cell: info => new Date(info.getValue()).toLocaleDateString()
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: info => (
        <button 
          onClick={() => handleDelete(info.row.original.id)}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition-colors"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      )
    })
  ], [leads]); // re-create when leads change to bind handlers

  const table = useReactTable({
    data: leads,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col transition-colors duration-200">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
          <span className="text-xl font-bold text-blue-600 tracking-tight">LeadDesk</span>
          <span className="text-xl font-bold text-gray-800 dark:text-gray-200 ml-1">Mini</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 font-medium transition-colors duration-200">
            <Users size={20} />
            Leads
          </a>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
          <button onClick={logout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white w-full transition-colors">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 lg:px-8 transition-colors duration-200">
          <h1 className="text-xl font-semibold dark:text-white">Dashboard</h1>
          <div className="flex items-center gap-4">
             <ThemeToggle />
             <button onClick={logout} className="md:hidden p-2 text-gray-500 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                <LogOut size={20} />
             </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 lg:p-8 space-y-8">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Leads', value: stats.total, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
              { label: 'New Leads', value: stats.new, icon: UserPlus, color: 'text-indigo-600', bg: 'bg-indigo-100' },
              { label: 'Contacted', value: stats.contacted, icon: UserCheck, color: 'text-yellow-600', bg: 'bg-yellow-100' },
              { label: 'Closed', value: stats.closed, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100' },
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between transition-colors duration-200">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center dark:opacity-80`}>
                  <stat.icon size={24} />
                </div>
              </div>
            ))}
          </div>

          {/* Table Section */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col transition-colors duration-200">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-4 items-center justify-between transition-colors duration-200">
              <h2 className="text-lg font-semibold dark:text-white">Recent Leads</h2>
              <form onSubmit={handleSearch} className="relative w-full sm:w-72">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search leads..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 dark:text-white transition-all"
                />
              </form>
            </div>

            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                   <div className="animate-pulse flex flex-col items-center gap-4">
                     <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
                     <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
                     <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                   </div>
                </div>
              ) : leads.length === 0 ? (
                <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                  <p className="text-lg font-medium text-gray-900 dark:text-white mb-1">No leads found</p>
                  <p className="text-sm">We couldn't find any leads matching your criteria.</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                      <tr key={headerGroup.id} className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                        {headerGroup.headers.map(header => (
                          <th key={header.id} className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors" onClick={header.column.getToggleSortingHandler()}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted() as string] ?? null}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {table.getRowModel().rows.map(row => (
                      <tr key={row.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            
            {/* Pagination */}
            {!isLoading && leads.length > 0 && (
              <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="p-1.5 rounded border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button 
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="p-1.5 rounded border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
