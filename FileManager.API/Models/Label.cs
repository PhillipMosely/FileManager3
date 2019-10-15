
namespace FileManager.API.Models
{
    public class Label
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string ModelName { get; set; }
        public string LabelName { get; set; }
        public virtual Company Company {get; set;}

    }
}