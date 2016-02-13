---
title: "How to Resize AWS EC2 EBS Volumes"
disqus_identifier: 2015-02-03-how-to-resize-aws-ec2-ebs-volumes
comments: true
---
It is impossible to resize an EBS volume. However, by creating a copy of the volume that is either larger or smaller, you can simulate a resize. Doing this with EBS volumes can be challenging, especially when they are mounted as the root device on an EC2 instance. This post is intended to provide step-by-step directions on how to either expand or shrink the size of an EBS volume.

**Before** you start the steps below to resize your volume, please make sure that you have a backup. This means, shutting down your EC2 instance and taking a snapshot of the root volume. This will allow you to come back should things go horribly wrong.

## Shrinking an EBS Volume
When you wish to shrink an EBS root volume, you will need to start a new, small EC2 instance that you can attach the volume you wish to resize. A t2.micro instance should be more than sufficient for this task. Once you have this instance created, proceed with the following steps.

1. You took a backup, right? If you did not, stop your EC2 instance and take a snapshot now. Seriously, I'll wait
2. Create a new EBS volume that is the size you wish to shrink to
3. Detach the volume you wish to resize from the current EC2 instance and attach both volumes to the new, small EC2 instance you created
    * Mount the old volume as /dev/sdf (this becomes /dev/xvdf)
    * Mount the new volume as /dev/sdg (this becomes /dev/xvdg)
4. Power on the new, small instance and wait for it to come online
5. SSH into the instance and run the following commands
6. To ensure that the file system is in order, run `sudo e2fsck -f /dev/xvdf1`. If you're resizing a different partition on the drive, change the number 1 to the partition number you wish to resize.
7. If the e2fsck command ran without errors, now run `sudo resize2fs -M -p /dev/xvdf1`. Again, change the 1 to the partition number you wish to resize if you're not resizing the first one.
8. The last line from the resize2fs command should tell you how many 4k blocks the filesystem now is. To calculate the number of 16MB blocks you need, use the following formula: blockcount * 4 / (16 * 1024). Round this number up to give yourself a little buffer.
9. If you dont yet have a partition on your new volume (/dev/xvdg1), use [fdisk to create one](http://www.howtogeek.com/106873/how-to-use-fdisk-to-manage-partitions-on-linux/).
10. Execute the following command, using the number you came up with in the previous step. `sudo dd bs=16M if=/dev/xvdf1 of=/dev/xvdg1 count=numberfrompreviousstep`. Depending on how large your volume is this may take several minutes to run -- let it finish.
11. After the copy finishes, resize and check and make sure that everything is in order with the new filesystem by running `sudo resize2fs -p /dev/xvdg1` followed by `sudo e2fsck -f /dev/xvdg1`.
12. After this step is complete, detach both volumes from the new instance you created. Attach the shrunken volume to the old EC2 instance as /dev/sda1 (your boot device) and restart your old instance. Save the previous, larger volume until you've validated that everything is working properly. When you've verified things are working well, feel free to delete the new EC2 instance you created, plus the larger volume and snapshot.

## Expanding an EBS Volume
Expanding the size of an EBS volume is a bit easier, since we dont have to execute a disk-disk copy. To expand the size of the volume, execute the following steps:

1. You took a backup, right? If you did not, stop your EC2 instance and take a snapshot now. Seriously, I'll wait
2. Create a new EBS volume from the snapshot specifying the new, larger size
3. Attach the new EBS volume to your existing EC2 instance, as /dev/sda1 if this is the root volume
4. Power on your existing instance and wait for it to come online
5. SSH into the instance and run the following commands
6. To ensure that the file system is in order, run `sudo e2fsck -f /dev/xvda1`. If you're resizing a different partition on the drive, change the number 1 to the partition number you wish to resize.
7. If the e2fsck command ran without errors, now run `sudo resize2fs -M -p /dev/xvda1`. Again, change the 1 to the partition number you wish to resize if you're not resizing the first one.
8. Save the previous, smaller volume and the snapshot until you've validated that everything is working properly. When you've verified things are working well, feel free to delete the original volume and snapshot.

I hope these instructions were able to help you. If you need some extra help, please feel free to shout out in the comments.
