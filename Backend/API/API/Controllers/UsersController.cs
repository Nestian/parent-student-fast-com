using System;
using API.Models;
using API.Logic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using API.Models.Backend.Models;

namespace Api.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserServices _userServices;

        public UsersController(BackendContext backendContext, UserServices userServices,
                              IConfiguration configuration)
        {
            _userServices = userServices ?? throw new ArgumentNullException(nameof(userServices));
        }

        // The below API request attempts to query the database with supplied user email. 
        // IF the user was found and the account is active, @RETURN appropriate user details.
        // OR user account is inactive, in which case @RETURN message that indicates it.
        // ELSE the user with specified email was not found. @RETURN 404 NotFound.
        [HttpGet]
        public ActionResult<Users> GetUser(string email)
        {
            if(email == null)
            {
                return BadRequest("No user email supplied");
            }

            UserResult userResult = _userServices.GetUserByEmail(email);
            if (!userResult.Result.IsSuccess)
            {
                return NotFound($"User with email {email} was not found");
            }

            Users user = userResult.User;
            if(!user.Active)
            {
                return Ok("User info is being archived");
            }

            return user;
        }

        [HttpPost]
        public ActionResult AddUser(string email, string password)
        {
            Result user = _userServices.AddUser(new Users
            {
                Active = true,
                Email = email,
                Password = password,
                UserId = null
            });

            if (!user.IsSuccess)
            {
                BadRequest(user.FunctionMessage);
            }

            
            return Ok(user.FunctionMessage);
        }

        [HttpDelete]
        public ActionResult RemoveUser(string email)
        {
            UserResult user = _userServices.GetUserByEmail(email);
            if (!user.Result.IsSuccess)
            {
                return BadRequest(user.Result.FunctionMessage);
            }

            Result result = _userServices.RemoveUser(email);
            if (!result.IsSuccess)
            {
                return BadRequest(result.FunctionMessage);
            }

            return Ok(result.FunctionMessage);
        }
    }
}