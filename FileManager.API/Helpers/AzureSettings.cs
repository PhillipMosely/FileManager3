namespace FileManager.API.Helpers
{
    public class AzureSettings
    {
        public string AccountName { get; set; }
        public string AccountKey { get; set; }
        public string ConnectionString { 
            get
            {
                return "DefaultEndpointsProtocol=https;"
                        + "AccountName=[" + AccountName
                        + "];AccountKey=[" + AccountKey + "];EndpointSuffix=core.windows.net";
            }  
        }
    }
}