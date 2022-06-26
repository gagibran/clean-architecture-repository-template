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

    /// <summary>
    /// Gets all users.
    /// </summary>
    /// <returns>All existing users, if any.</returns>
    /// <response code="200">Returns all existing users, if any.</response>
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

    /// <summary>
    /// Gets an user by ID.
    /// </summary>
    /// <param name="id">The existing user's ID.</param>
    /// <returns>The user, if it exists.</returns>
    /// <response code="200">Returns the existing user.</response>
    /// <response code="404">If the user does not exist.</response>
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

    /// <summary>
    /// Creates a new user.
    /// </summary>
    /// <param name="user">The user data from the body.</param>
    /// <returns>A newly created user</returns>
    /// <remarks>
    /// Sample request:
    ///
    ///     POST /User
    ///     {
    ///        "firstName": "John",
    ///        "lastName": "Doe",
    ///        "email": "johndoe@example.com",
    ///        "dateOfBirth": "2022-06-26T15:06:55.759Z",
    ///        "address1": "123 Copperas Cove",
    ///        "zipCode": "76522",
    ///        "state": "Texas"
    ///     }
    ///
    /// </remarks>
    /// <response code="201">Returns the newly created user</response>
    /// <response code="400">If one or more fields are incorrect.</response>
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

    /// <summary>
    /// Updates an existing user.
    /// </summary>
    /// <param name="user">The user data from the body.</param>
    /// <param name="id">The existing user's ID.</param>
    /// <remarks>
    /// Sample request:
    ///
    ///     PUT /User
    ///     {
    ///        "firstName": "John",
    ///        "lastName": "Doe",
    ///        "email": "johndoe@example.com",
    ///        "dateOfBirth": "2022-06-26T15:06:55.759Z",
    ///        "address1": "123 Fargo",
    ///        "zipCode": "58102",
    ///        "state": "North Dakota"
    ///     }
    ///
    /// </remarks>
    /// <response code="204">If the user is correctly updated.</response>
    /// <response code="400">If one or more fields are incorrect.</response>
    /// <response code="404">If the user does not exist.</response>
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

    /// <summary>
    /// Deletes an user by ID.
    /// </summary>
    /// <param name="id">The existing user's ID.</param>
    /// <response code="204">If the user is successfully deleted.</response>
    /// <response code="404">If the user does not exist.</response>
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
