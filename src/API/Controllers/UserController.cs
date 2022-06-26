using Core.Entities;
using Core.Exceptions;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class UserController : BaseController
{
#if (configureUnitOfWork)
    private readonly IUnitOfWork _unitOfWork;

    public UserController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
#else
    private readonly IUserRepository _users;

    public UserController(IUserRepository users)
    {
        _users = users;
    }
#endif

    [HttpGet]
    public async Task<IActionResult> GetUsersAsync()
    {
#if (configureUnitOfWork)
        IEnumerable<User> existingUsers = await _unitOfWork.Users.GetAllAsync();
#else
        IEnumerable<User> existingUsers = await _users.GetAllAsync();
#endif
        return Ok(existingUsers);
    }

    [HttpGet("{id}")]
    [ActionName(nameof(GetUserByIdAsync))]
    public async Task<IActionResult> GetUserByIdAsync(Guid id)
    {
        try
        {
#if (configureUnitOfWork)
            User existingUser = await _unitOfWork.Users.GetByIdAsync(id);
#else
            User existingUser = await _users.GetByIdAsync(id);
#endif
            return Ok(existingUser);
        }
        catch (NotFoundException)
        {
            return NotFound();
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateUserAsync(User user)
    {
#if (configureUnitOfWork)
        await _unitOfWork.Users.CreateAsync(user);
        await _unitOfWork.SaveAsync();
#else
        await _users.CreateAsync(user);
        await _users.SaveAsync();
#endif
        return CreatedAtAction(nameof(GetUserByIdAsync), new { id = user.Id }, user);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUserAsync(User user, Guid id)
    {
        try
        {
#if (configureUnitOfWork)
            await _unitOfWork.Users.UpdateUserAsync(user, id);
            await _unitOfWork.SaveAsync();
#else
            await _users.UpdateUserAsync(user, id);
            await _users.SaveAsync();
#endif
            return NoContent();
        }
        catch (NotFoundException)
        {
            return NotFound();
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUserAsync(Guid id)
    {
        try
        {
#if (configureUnitOfWork)
            await _unitOfWork.Users.DeleteAsync(id);
            await _unitOfWork.SaveAsync();
#else
            await _users.DeleteAsync(id);
            await _users.SaveAsync();
#endif
            return NoContent();
        }
        catch (NotFoundException)
        {
            return NotFound();
        }
    }
}
