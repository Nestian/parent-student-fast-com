using System;
using System.Collections.Generic;
using System.Linq;
using API.Models;
using API.Models.Backend.Models;

namespace API.Logic
{
    public class UsersResult
    {
        public Result Result { get; set; }
        public List<Users> Users { get; set; }
    }

    public class UserResult
    {
        public Result Result { get; set; }
        public Users User { get; set; }
    }

    public class MessagesResult
    {
        public Result Result { get; set; }
        public List<string> Messages { get; set; }
    }

    public class UserServices
    {
        private readonly BackendContext _backendContext;
        public UserServices(BackendContext backendContext)
        {
            _backendContext = backendContext ?? throw new ArgumentNullException(nameof(backendContext));
        }

        public Result InvalidResult(string message)
        {
            return new Result
            {
                IsSuccess = false, FunctionMessage = message
            };
        }

        public UserResult InvalidUserResult(string message)
        {
            return new UserResult
            {
                Result = new Result
                { IsSuccess = false, FunctionMessage = message },
                User = null
            };
        }

        public MessagesResult InvalidUserMessageResult(string message)
        {
            return new MessagesResult
            {
                Result = new Result
                { IsSuccess = false, FunctionMessage = message },
                Messages = null
            };
        }

        public string GetUserEmailById(string id)
        {
            return _backendContext
                        .Users
                            .SingleOrDefault(u => u.UserId
                                .Equals(id, StringComparison.OrdinalIgnoreCase))
                                    .Email;
        }

        public string GetUserIdByEmail(string email)
        {
            return _backendContext
                    .Users
                       .SingleOrDefault(u => u.Email
                        .Equals(email, StringComparison.OrdinalIgnoreCase))
                          .UserId;
        }

        public UserResult GetUserByEmail(string email)
        {
            Users user = _backendContext
                           .Users
                                .SingleOrDefault(u => u.Email
                                    .Equals(email, StringComparison.OrdinalIgnoreCase));

            if (user == null)
            {
                return InvalidUserResult($"No user with email: {email}");
            }

            if (!user.Active)
            {
                return InvalidUserResult("User info is being archived");
            }

            return new UserResult()
            {
                Result = new Result()
                {
                    IsSuccess = true,
                    FunctionMessage = "User found successfully"
                },
                User = user
            };
        }

        public UserResult GetUserById(string userId)
        {
            Users user = _backendContext
                            .Users
                                .SingleOrDefault(u => u.UserId
                                    .Equals(userId, StringComparison.OrdinalIgnoreCase));

            if (user == null)
            {
                return InvalidUserResult($"No user with id: {userId}");
            }
            
            if (!user.Active)
            {
                return InvalidUserResult($"User info is being archived");
            }

            return new UserResult()
            {
                Result = new Result()
                {
                    IsSuccess = true,
                    FunctionMessage = "User found successfully"
                },
                User = user
            };
        }
        
        public Result AddUser(Users newUser)
        {
            foreach (Users user in _backendContext.Users)
            {
                if (user.Email.Equals(newUser.Email, StringComparison.OrdinalIgnoreCase))
                {
                    return InvalidResult("User with this email already exists");
                }
            }

            newUser.UserId = new Guid().ToString();
            _backendContext.Add(newUser);
            _backendContext.SaveChanges();

            return new Result() { IsSuccess = true, FunctionMessage = "User created successfully" };
        }

        public Result RemoveUser(string email)
        {
            UserResult user = GetUserByEmail(email);
            if (!user.Result.IsSuccess)
            {
                return InvalidResult($"No user with email {email}");
            }

            if(!user.User.Active)
            {
                return InvalidResult($"User info is already being archived");
            }

            user.User.Active = false;
            _backendContext.SaveChanges();
            return new Result { IsSuccess = true, FunctionMessage = "User is now being archived" }; 
        }

        public MessagesResult GetAllUserMessages(string email)
        {
            UserResult user = GetUserByEmail(email);
            if (!user.Result.IsSuccess)
            {
                return InvalidUserMessageResult(user.Result.FunctionMessage);
            }
            string userId = user.User.UserId;
       
            List<UserMessages> userMessages = _backendContext.UserMessages.
                Where(x => x.UserId == userId).ToList();

            if (userMessages.Count == 0 || userId == null)
            {
                return InvalidUserMessageResult($"No messages for {email}");
            }

            List<string> messages = new List<string>();
            foreach (UserMessages userMessage in userMessages)
            {
                messages.Add(userMessage.Message);
            }

            if (messages.Count == 0)
            {
                return InvalidUserMessageResult($"No messages for {email}");
            }

            return new MessagesResult
            {
                Result = new Result { IsSuccess = true, FunctionMessage = "Messages found" },
                Messages = messages
            };
        }
    }
}