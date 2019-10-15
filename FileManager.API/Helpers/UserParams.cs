namespace FileManager.API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 1000;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 1000;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; } 
        }

        public int UserId { get; set; }

    }
}