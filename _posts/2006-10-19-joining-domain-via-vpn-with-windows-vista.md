---
title: Joining domain via VPN with Windows Vista
disqus_identifier: 2006-10-joining-domain-via-vpn-with-windows-vista
comments: true
---

After being infected with a crappy piece of spyware, I took the plunge and repaved my machine with RC2 of Windows Vista. As it turns out, that may have been a futile exercise, since rumour has it that Vista will RTM on the 25th of October. But, I digress...

With Windows XP, it was pretty self explanatory on how to join a domain when you were remote. You would create a VPN connection, allow everyone access to it, and then when you'd login, you would select to dial that connection before logging in. That way, you could log in and get the credentials cached.

I spent quite a bit of time trying to figure out how to do this in Windows Vista, and what I ultimately found was that you needed to create the VPN connection with your local account (the one you created during setup). Dial the connection, and then switch user (the little flyout right next to the padlock on the Start menu). From there, you can type in your domain/username/password combination and it will log you in using that connection.

Once this is done, the credentials are cached, and you can log in to the machine using your domain information without actually being connected.
