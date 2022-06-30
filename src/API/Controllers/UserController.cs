using CleanArchRepoTemplate.Core.Interfaces;

namespace CleanArchRepoTemplate.API.Controllers;

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
#if (configureUnitOfWork)
        User? existingUser = await _unitOfWork.Users.GetByIdAsync(id);
#else
        User? existingUser = await _users.GetByIdAsync(id);
#endif
        if (existingUser is null)
        {
            return NotFound();
        }
        return Ok(existingUser);
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
    ///        "address2": "Building 2",
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
#if (configureUnitOfWork)
        User? existingUser = await _unitOfWork.Users.GetByIdAsync(id);
        if (existingUser is null)
        {
            return NotFound();
        }
        existingUser.FirstName = user.FirstName;
        existingUser.LastName = user.LastName;
        existingUser.Email = user.Email;
        existingUser.DateOfBirth = user.DateOfBirth;
        existingUser.Address1 = user.Address1;
        existingUser.Address2 = user.Address2;
        existingUser.Address2 = user.ZipCode;
        existingUser.State = user.State;
        existingUser.UpdatedAt = DateTime.UtcNow;
        _unitOfWork.Users.UpdateUser(user);
        await _unitOfWork.SaveAsync();
#else
        User? existingUser = await _users.GetByIdAsync(id);
        if (existingUser is null)
        {
            return NotFound();
        }
        existingUser.FirstName = user.FirstName;
        existingUser.LastName = user.LastName;
        existingUser.Email = user.Email;
        existingUser.DateOfBirth = user.DateOfBirth;
        existingUser.Address1 = user.Address1;
        existingUser.Address2 = user.Address2;
        existingUser.Address2 = user.ZipCode;
        existingUser.State = user.State;
        existingUser.UpdatedAt = DateTime.UtcNow;
        _users.UpdateUser(user);
        await _users.SaveAsync();
#endif
        return NoContent();
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
#if (configureUnitOfWork)
        User? existingUser = await _unitOfWork.Users.GetByIdAsync(id);
        if (existingUser is null)
        {
            return NotFound();
        }
        _unitOfWork.Users.Delete(existingUser);
        await _unitOfWork.SaveAsync();
#else
        User? existingUser = await _users.GetByIdAsync(id);
        if (existingUser is null)
        {
            return NotFound();
        }
        _users.Delete(existingUser);
        await _users.SaveAsync();
#endif
        return NoContent();
    }
}
