using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Villsource.TheCatsLedger.Migrations
{
    /// <inheritdoc />
    public partial class AddPaymentNoticeAndSlip : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "ConfirmedAt",
                table: "BillsPayers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "PaidAt",
                table: "BillsPayers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PayerNote",
                table: "BillsPayers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SlipImageBase64",
                table: "BillsPayers",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConfirmedAt",
                table: "BillsPayers");

            migrationBuilder.DropColumn(
                name: "PaidAt",
                table: "BillsPayers");

            migrationBuilder.DropColumn(
                name: "PayerNote",
                table: "BillsPayers");

            migrationBuilder.DropColumn(
                name: "SlipImageBase64",
                table: "BillsPayers");
        }
    }
}
