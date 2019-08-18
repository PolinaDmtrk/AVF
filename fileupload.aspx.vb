Imports System.IO

Partial Class fileupload
    Inherits System.Web.UI.Page
    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        'Context.Response.ContentType = "text/plain"
        Try
            Dim str_file As String = ""
            Dim file As HttpPostedFile
            For Each s In Context.Request.Files
                file = Context.Request.Files(s)
                file.SaveAs("C:/inetpub/wwwroot/AVF/img/" + file.FileName)

            Next
            Context.Response.Write("end_files_loaded")
        Catch ex As Exception
            Context.Response.Write(ex.Message)
        End Try
    End Sub
End Class