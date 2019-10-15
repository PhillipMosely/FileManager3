using Microsoft.EntityFrameworkCore.Migrations;

namespace FileManager.API.Migrations
{
    public partial class addedlabels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Labels",
                columns: table => new
                {
                    CompanyId = table.Column<int>(nullable: false),
                    ModelName = table.Column<string>(nullable: false),
                    Id = table.Column<int>(nullable: false),
                    LabelName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Labels", x => new { x.CompanyId, x.ModelName });
                    table.ForeignKey(
                        name: "FK_Labels_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Labels");
        }
    }
}
