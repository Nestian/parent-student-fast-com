using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Logic;

namespace API.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class UserMessagesController : ControllerBase
    {
        private readonly BackendContext _backendContext;

        private readonly UserServices _userServices;
        public UserMessagesController(BackendContext backendContext, UserServices userServices)
        {
            _backendContext = backendContext ?? throw new ArgumentNullException(nameof(backendContext));
            _userServices = userServices ?? throw new ArgumentNullException(nameof(userServices));
        }

        [HttpGet]
        public ActionResult<List<string>> GetUserMessages(string email)
        {
            MessagesResult messages = _userServices.GetAllUserMessages(email);
            if (!messages.Result.IsSuccess)
            {
                return BadRequest(messages.Result.FunctionMessage);
            }

            return messages.Messages;
        }

        [HttpPost]
        public ActionResult AddUserMessage(string email, string message)
        {
            UserResult user = _userServices.GetUserByEmail(email);
            if (!user.Result.IsSuccess)
            {
                return BadRequest(user.Result.FunctionMessage);
            }

            UserMessages userMessage = new UserMessages
            {
                UserId = user.User.UserId,
                Message = message
            };

            _backendContext.UserMessages.Add(userMessage);
            _backendContext.SaveChanges();
            return Ok("User message has been recorded");
        }
    }
}