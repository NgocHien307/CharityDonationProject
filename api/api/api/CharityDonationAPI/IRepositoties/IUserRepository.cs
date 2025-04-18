﻿using CharityDonationApi.Models;
using CharityDonationApi.ViewModels;

namespace CharityDonationApi.IRepositoties
{
    public interface IUserRepository
    {
        Task<List<Users>> GetAll();
        Task<UserVm> GetById(int id);
        Task AddUser(UserVm userVm);
        Task UpdateUser(int id, UserVm userVm);
        Task DeleteUser(int id);



        Task<List<UserVm>> SearchUsers(string searchTerm);
        Task AssignRole(int userId, int roleId);
        Task ControlUserAccess(int userId, bool isActive);
        Task<(List<UserVm> Users, int TotalCount, int TotalPages)> GetPaginatedUsers(int pageNumber, int pageSize);
    }
}
