using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackendServices.Migrations
{
    /// <inheritdoc />
    public partial class ModifiedUserScore : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "Score",
                table: "Users",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Score",
                table: "Users");
        }
    }
}
