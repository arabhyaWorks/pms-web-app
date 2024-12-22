import React, { useState, useEffect } from "react";
import axios from "axios";
import { endpoint } from "../utils/dataSet";
import { Plus, Search, Filter, ChevronDown } from "lucide-react";
import MobileHeader from "../components/MobileHeader";
import IssueCard from "../components/IssueCard";
import { issuesData } from "../data/issues";

export default function IssuesPage() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredIssues = issuesData.filter(issue =>
    selectedStatus === 'all' || issue.status.toLowerCase() === selectedStatus
  );

  const fetchIssues = async () => {
    setLoading(true);
    setError("");
    try {
      const params: any = {};
      if (
        user?.entityId &&
        user?.entityTypeId &&
        (user?.userRole === 3 || user?.userRole === 4)
      ) {
        params["entityId"] = user.entityId;
        params["entityTypeId"] = user.entityTypeId;
      }

      const response = await axios.get(`${endpoint}/api/entity/issues`, {
        params,
      });
      setIssues(response.data.data);
    } catch (err) {
      console.error("Error fetching issues:", err);
      setError("Failed to fetch issues.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchIssues();
  }, [user]);


  const priorityOptions = [
    { value: "1", label: "High" },
    { value: "2", label: "Medium" },
    { value: "3", label: "Low" },
  ];

  return (
    <div className="pb-20 pt-16 bg-gray-50">
      <MobileHeader />

      <div className="px-4 py-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Issues</h1>
            <p className="text-sm text-gray-500">
              Total Issues ({issues.length})
            </p>
          </div>
          {/* <button className="bg-orange-500 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm">
            <Plus className="w-4 h-4" />
            Create Issue
          </button> */}
        </div>

        {/* Search and Filter */}
        <div className="space-y-3 mb-4">
          {/* <div className="relative">
            <input
              type="text"
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div> */}

          {/* <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-lg border border-gray-300 w-full"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className="w-4 h-4 ml-auto" />
          </button> */}

          {showFilters && (
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-sm mb-2">Status</h3>
              <div className="flex flex-wrap gap-2">
                {["all", "new", "in progress", "resolved", "closed"].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        selectedStatus === status
                          ? "bg-orange-100 text-orange-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {status}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Issues List */}
        <div className="space-y-4">
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </div>
    </div>
  );
}
