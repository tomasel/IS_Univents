<%- include('header') -%>

<h1><%= title %></h1>

<img src="/images/univents_logo/univents_vents_logo.png" width="205" height="220"  alt="univents_logo">
<img src="/images/sigillo_universita/Sigillo_Universita_di_Trento.svg" width="205" height="220"  alt="Sigillo_Università_di_Trento" float="right">

<form method="get" action="/login">
  <p>
    <input type="submit" value="Login">
  </p>
</form>

<%- include('footer') -%>
