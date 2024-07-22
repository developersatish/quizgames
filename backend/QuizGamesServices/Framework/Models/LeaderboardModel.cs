using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Framework.Models
{
    public class LeaderboardModel
    {
        public List<UserModel> TopUsers { get; set; }
        public int YourRank { get; set; }
    }
}
