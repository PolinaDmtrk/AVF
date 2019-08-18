
Imports System.Web
Imports System.Web.Services
Imports System.Configuration.ConfigurationManager
Imports System.Web.Script.Services
Imports System.Collections.Generic
Imports System.Data.SqlClient
Imports System.Data

Partial Class _Default
    Inherits System.Web.UI.Page
    Shared Term_bd_Connection As String = System.Configuration.ConfigurationManager.ConnectionStrings("Term_bd_Connection").ConnectionString

    Class cCategories
        Public id As String
        Public FullName As String
    End Class

    <WebMethod()> _
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Shared Function getCategories() As List(Of cCategories)
        Dim result As New List(Of cCategories)
        Dim drR As SqlDataReader = Nothing
        Using conn As New SqlConnection(Term_bd_Connection)
            Try

                Using cmd As New SqlCommand()
                    cmd.CommandType = Data.CommandType.Text
                    cmd.CommandText = "SELECT TOP 7 id, FullName from dbo.Txt_Shablon_Category"
                    cmd.Connection = conn
                    conn.Open()
                    drR = cmd.ExecuteReader()

                End Using

                While drR.Read()
                    result.Add(New cCategories With {.id = drR("id"), .FullName = drR("FullName")})
                End While

                Return result
            Catch ex As Exception
                result.Add(New cCategories With {.id = "-1", .FullName = ex.Message})
                Return result
            Finally
                conn.Close()
            End Try
        End Using
    End Function


    Class cUnits
        Public idAVF As String
        Public idUnit As String
        Public nameUnit As String
        Public idCategory As String
        Public nameTransform As String
        Public prAVF As String
    End Class

    <WebMethod()> _
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Shared Function getUnits() As List(Of cUnits)
        Dim result As New List(Of cUnits)
        Dim drR As SqlDataReader = Nothing
        Using conn As New SqlConnection(Term_bd_Connection)
            Try

                Using cmd As New SqlCommand()
                    cmd.CommandType = Data.CommandType.Text
                    cmd.CommandText = "terminal.avf.pr_getUnits"
                    cmd.Connection = conn
                    conn.Open()
                    drR = cmd.ExecuteReader()
                End Using

                While drR.Read()
                    result.Add(New cUnits With {.idAVF = drR("idAVF"), .idUnit = drR("idUnit"), .nameUnit = drR("nameUnit"), .idCategory = drR("idCategory"), .nameTransform = drR("nameTransform"), .prAVF = drR("prAVF")})
                End While

                Return result
            Catch ex As Exception
                result.Add(New cUnits With {.idAVF = "-1", .nameUnit = ex.Message})
                Return result
            Finally
                conn.Close()
            End Try
        End Using
    End Function


    Class cUnitInfo
        Public description As String
        Public example As String
    End Class

    <WebMethod()> _
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Shared Function getUnitInfo(ByVal id As String) As List(Of cUnitInfo)
        Dim result As New List(Of cUnitInfo)
        Dim drR As SqlDataReader = Nothing
        Using conn As New SqlConnection(Term_bd_Connection)
            Try

                Using cmd As New SqlCommand()
                    cmd.CommandType = Data.CommandType.Text
                    cmd.CommandText = "terminal.avf.pr_getMainDataByTransform " + id
                    cmd.Connection = conn
                    conn.Open()
                    drR = cmd.ExecuteReader()
                End Using

                While drR.Read()
                    result.Add(New cUnitInfo With {.description = drR("description"), .example = drR("example")})
                End While

                Return result
            Catch ex As Exception
                result.Add(New cUnitInfo With {.description = "-1", .example = ex.Message})
                Return result
            Finally
                conn.Close()
            End Try
        End Using
    End Function


    Class cUnitInParameters
        Public paramtext As String
        Public text As String
        Public param_number As String
    End Class

    <WebMethod()> _
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Shared Function getUnitInParameters(ByVal id As String) As List(Of cUnitInParameters)
        Dim result As New List(Of cUnitInParameters)
        Dim drR As SqlDataReader = Nothing
        Using conn As New SqlConnection(Term_bd_Connection)
            Try

                Using cmd As New SqlCommand()
                    cmd.CommandType = Data.CommandType.Text
                    cmd.CommandText = "terminal.avf.pr_getServiceInputParametersByUnit " + id
                    cmd.Connection = conn
                    conn.Open()
                    drR = cmd.ExecuteReader()
                End Using

                While drR.Read()
                    result.Add(New cUnitInParameters With {.paramtext = drR("paramtext"), .text = drR("text"), .param_number = drR("param_number")})
                End While

                Return result
            Catch ex As Exception
                result.Add(New cUnitInParameters With {.paramtext = "-1", .text = ex.Message})
                Return result
            Finally
                conn.Close()
            End Try
        End Using
    End Function


    Class cUnitOutParameters
        Public id As String
        Public name As String
    End Class

    <WebMethod()> _
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Shared Function getUnitOutParameters(ByVal id As String) As List(Of cUnitOutParameters)
        Dim result As New List(Of cUnitOutParameters)
        Dim drR As SqlDataReader = Nothing
        Using conn As New SqlConnection(Term_bd_Connection)
            Try

                Using cmd As New SqlCommand()
                    cmd.CommandType = Data.CommandType.Text
                    cmd.CommandText = "terminal.avf.pr_getServiceOutputParametersByUnit " + id
                    cmd.Connection = conn
                    conn.Open()
                    drR = cmd.ExecuteReader()
                End Using

                While drR.Read()
                    result.Add(New cUnitOutParameters With {.id = drR("id"), .name = drR("name")})
                End While

                Return result
            Catch ex As Exception
                result.Add(New cUnitOutParameters With {.id = "-1", .name = ex.Message})
                Return result
            Finally
                conn.Close()
            End Try
        End Using
    End Function


    Class cAllOutParameters
        Public id As String
        Public name As String
    End Class

    <WebMethod()> _
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Shared Function getAllOutParameters() As List(Of cAllOutParameters)
        Dim result As New List(Of cAllOutParameters)
        Dim drR As SqlDataReader = Nothing
        Using conn As New SqlConnection(Term_bd_Connection)
            Try

                Using cmd As New SqlCommand()
                    cmd.CommandType = Data.CommandType.Text
                    cmd.CommandText = "SELECT id, name from terminal.avf.spFields order by 2"
                    cmd.Connection = conn
                    conn.Open()
                    drR = cmd.ExecuteReader()
                End Using

                While drR.Read()
                    result.Add(New cAllOutParameters With {.id = drR("id"), .name = drR("name")})
                End While

                Return result
            Catch ex As Exception
                result.Add(New cAllOutParameters With {.id = "-1", .name = ex.Message})
                Return result
            Finally
                conn.Close()
            End Try
        End Using
    End Function


    <WebMethod()> _
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Shared Function updateUnitInfo(ByVal id As String, ByVal description As String) As Integer
        Dim result As Integer
        Dim drR As SqlDataReader = Nothing
        Using conn As New SqlConnection(Term_bd_Connection)
            Try

                Using cmd As New SqlCommand()
                    cmd.CommandType = Data.CommandType.Text
                    cmd.CommandText = "update terminal.avf.AvfData set description='" + description + "' where id=" + id
                    cmd.Connection = conn
                    conn.Open()
                    result = cmd.ExecuteNonQuery()

                End Using

                Return result
            Catch ex As Exception
                result = -1

            Finally
                conn.Close()
            End Try
        End Using
        Return result
    End Function


    <WebMethod()> _
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Shared Function updateUnitOutParams(ByVal id As String, ByVal outFields As String) As Integer
        Dim result As Integer
        Dim drR As SqlDataReader = Nothing
        Using conn As New SqlConnection(Term_bd_Connection)
            Try

                Using cmd As New SqlCommand()
                    cmd.CommandType = Data.CommandType.Text
                    cmd.CommandText = "terminal.avf.pr_updateUnitOutputParameters '" + id + "','" + outFields + "'"
                    cmd.Connection = conn
                    conn.Open()
                    result = cmd.ExecuteNonQuery()

                End Using

                Return result
            Catch ex As Exception
                result = -1

            Finally
                conn.Close()
            End Try
        End Using
        Return result
    End Function


    <WebMethod()> _
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Shared Function updatePrAVF(ByVal id As String, ByVal prAVF As String) As Integer
        Dim result As Integer
        Dim drR As SqlDataReader = Nothing
        Using conn As New SqlConnection(Term_bd_Connection)
            Try

                Using cmd As New SqlCommand()
                    cmd.CommandType = Data.CommandType.Text
                    cmd.CommandText = "update terminal.avf.AvfData set active_for_avf='" + prAVF + "' where id=" + id
                    cmd.Connection = conn
                    conn.Open()
                    result = cmd.ExecuteNonQuery()

                End Using

                Return result
            Catch ex As Exception
                result = -1

            Finally
                conn.Close()
            End Try
        End Using
        Return result
    End Function


    <WebMethod()> _
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Shared Function updateImageData(ByVal id As String, ByVal examplePuth As String) As Integer
        Dim result As Integer
        Dim drR As SqlDataReader = Nothing
        Using conn As New SqlConnection(Term_bd_Connection)
            Try

                Using cmd As New SqlCommand()
                    cmd.CommandType = Data.CommandType.Text
                    cmd.CommandText = "update terminal.avf.AvfData set example='" + examplePuth + "' where id=" + id
                    cmd.Connection = conn
                    conn.Open()
                    result = cmd.ExecuteNonQuery()

                End Using

                Return result
            Catch ex As Exception
                result = -1

            Finally
                conn.Close()
            End Try
        End Using
        Return result
    End Function
End Class
